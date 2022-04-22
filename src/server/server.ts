import express from 'express'
import { Server as HTTPServer } from 'http'
import { Server as SocketServer } from 'socket.io'
import path from 'path'
const app = express()
const server = new HTTPServer(app)
const io = new SocketServer(server)

import * as settingsJson from '../storage/settings.json'
import * as usersJson from '../storage/users.json'

import { IMachine, ISettings } from '../model/settingsInterface'
import { IUser, IUserAccessRights } from '../model/usersInterface'
import { ISocketClient } from '../model/socketClientInterface'
import * as IO from '../model/socketConstants'
import { logger } from './utils/logger'
import { saveUsersFile } from './utils/storage'

import { emberMtxServer } from './gateways/emberServer'
import { emberLocalClient, setMatrixConnection } from './gateways/emberLocalClient'
emberMtxServer()
emberLocalClient()

const port: number = parseInt(process.env.PORT || '3000', 10) || 3000
import moment from 'moment'
let socketClients: ISocketClient[] = []
let settings: ISettings = settingsJson
let users: IUser[] = usersJson.users
logger.data(settings).debug('Settings')

// socket.io server
io.on('connection', (socket: any) => {
  let thisUser: IUser
  if (socket.handshake.headers.userurl) {
    const userUrlName = socket.handshake.headers.userurl
    const masterSlave = socket.handshake.headers.masterslave || ''
    thisUser = users.find((userId: IUser) => userId.id === userUrlName) || {
      id: userUrlName,
      name: '',
      accessRights: [],
    }
    socketClients.push({
      id: socket.id,
      userUrlName: userUrlName,
      roomName: '-1',
      connectionTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      masterSlave: masterSlave,
    })

    logger.debug(`Number of active sockets: ${socketClients.length}`)
    socket.emit(IO.THIS_USER, thisUser)

    const accessToPages: IMachine[] = settings.machines.filter((webpage: IMachine) => {
      return thisUser.accessRights.find((access) => {
        return access.machineId === webpage.id
      })
    })
    socket.emit(IO.MACHINES, accessToPages)
  }

  socket.on('disconnecting', () => {
    socketClients = socketClients.filter((client) => {
      return client.id !== socket.id
    })
    updateClientsInRooms()
  })

  socket.once('disconnect', () => {
    logger.debug(`Socket with id: ${socket.id} disconnected`)
  })

  socket.on(IO.ADMIN_GET_DATA, () => {
    socket.emit(IO.ADMIN_ALL_USERS, users)
    socket.emit(IO.ADMIN_ALL_MACHINES, settings.machines)
  })

  socket.on(IO.ADMIN_STORE_USERS_JSON, (payload: IUser[]) => {
    saveUsersFile(payload)
    users = payload
  })

  socket.on(IO.ADMIN_RESTART_SERVER, () => {
    process.exit(0)
  })

  socket.on(IO.JOIN_ROOM, (buttonIndex: number) => {
    logger.debug(`Socket.on('room') payload: ${buttonIndex}`)
    leaveRoom()
    if (buttonIndex >= 0) {
      joinRoom(thisUser.accessRights[buttonIndex].machineId)
    } else {
      joinRoom('-1')
    }
    if (thisUser.emberTarget) {
      // Target : (- 1) = convert EmberTarget to index
      // Source: (buttonIndex + 1 as -1 is "offline" index 1 )
      setMatrixConnection(thisUser.emberTarget - 1, buttonIndex + 1)
    }
    updateSlaves(buttonIndex)
    updateClientsInRooms()
  })

  const isUserWithAccess = (client: ISocketClient, user: IUser, machine: IMachine) =>
    client.userUrlName === user.id && !findAccessRights(user, machine.id)?.anonymousAccess

  const updateClientsInRooms = () => {
    settings.machines.forEach((machine: IMachine) => {
      const usersInRoom = socketClients
        .filter((client) => client.roomName === machine.id)
        .map((client) => users.find((user: IUser) => isUserWithAccess(client, user, machine))?.name)
        .filter((clientName): clientName is string => clientName !== undefined)
      io.to(machine.id.toString()).emit(IO.USERS_IN_ROOM, usersInRoom)
    })
  }

  const joinRoom = (room: string) => {
    logger.debug(`Socket with id: ${socket.id} joined room: ${room}`)
    socket.join(room)
    socketClients[findSocketIndex(socket.id)].roomName = room
  }

  const updateSlaves = (buttonIndex: number) => {
    socketClients.forEach((client) => {
      if (client.masterSlave === thisUser.id) {
        io.to(client.id).emit(IO.SLAVE_SET_ROOM, buttonIndex)
      }
    })
  }

  const leaveRoom = () => {
    if (socketClients[findSocketIndex(socket.id)].roomName !== '') {
      logger.debug(`Socket with id: ${socket.id} left room: ${socketClients[findSocketIndex(socket.id)].roomName}`)
      socket.leave(socketClients[findSocketIndex(socket.id)].roomName)
    }
  }
})

const findSocketIndex = (userId: string): number => {
  return socketClients.findIndex((client) => client.id === userId)
}

const findAccessRights = (user: IUser, machineId: string): IUserAccessRights | undefined => {
  return user.accessRights.find((access: IUserAccessRights) => access.machineId === machineId)
}

app.use('/', express.static(path.join(__dirname, '../client')))
app.use('/admin', express.static(path.join(__dirname, '../admin')))
server.listen(port)
logger.info(`Server started at http://localhost:${port}`)

server.on('connection', () => {
  app.get('/', (_req: any, res: any) => {
    res.sendFile(path.resolve('index.html'))
  })
  app.get('/admin', (_req: any, res: any) => {
    res.sendFile(path.resolve('index.html'))
  })
})
