import express from 'express'
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const path = require('path')

import * as settingsJson from '../storage/settings.json'
import { ISettings, IUser } from '../model/settingsInterface'
import { ISocketClient, IRoomPayload } from '../model/socketClientInterface'
import {
    JOIN_ROOM,
    THIS_USER,
    USERS_IN_ROOM,
    WEBPAGES,
} from '../model/socketConstants'

const port: number = parseInt(process.env.PORT || '3000', 10) || 3000
const dev: boolean = process.env.NODE_ENV !== 'production'
const moment = require('moment')

let socketClients: ISocketClient[] = []
let settings: ISettings = settingsJson

// socket.io server
io.on('connection', (socket: any) => {
    const userUrlName = socket.handshake.headers.userurl
    const thisUser: IUser = settings.users.find(
        (userId: any) => userId.id === userUrlName
    ) || {
        id: userUrlName,
        name: '',
        accessRights: [-1]
    }

    socketClients.push({
        id: socket.id,
        userUrlName: userUrlName,
        roomName: '',
        connectionTime: new moment().format('YYYY-MM-DD HH:mm:ss'),
    })

    socket.emit(WEBPAGES, JSON.stringify(settings.webpages))

    socket.on('disconnecting', () => {
        socketClients = socketClients.filter((client) => {
            return client.id !== socket.id
        })
        updateClientsInRooms()
    })

    socket.on(JOIN_ROOM, (payload: IRoomPayload) => {
        socket.emit(
            THIS_USER,
            JSON.stringify(
                thisUser
            )
        )
        leaveRoom()
        joinRoom(payload)
        updateClientsInRooms()
    })

    socket.once('disconnect', () => {})

    const updateClientsInRooms = () => {
        settings.webpages.forEach((webpage) => {
            let clientsInRoom = socketClients.filter((client) => {
                return client.roomName === webpage.id.toString()
            })

            let usersUrlInRoom: IUser[] = clientsInRoom.map((client) => {
                return settings.users.find((user: IUser) => {
                    return client.userUrlName === user.id
                })
            })
            let usersInRoom: string[] = usersUrlInRoom.map((user: IUser) => {
                return user.name
            })
            io.to(webpage.id.toString()).emit(
                USERS_IN_ROOM,
                JSON.stringify(usersInRoom)
            )
        })
    }

    const joinRoom = (payload: IRoomPayload) => {
        if (
            socketClients[findIndex(socket.id)].userUrlName !==
            payload.userUrlName
        ) {
            disconnectClient()
        }
        socket.join(payload.roomName)
        socketClients[findIndex(socket.id)].roomName = payload.roomName
        socketClients[findIndex(socket.id)].userUrlName = payload.userUrlName
    }

    const leaveRoom = () => {
        if (socketClients[findIndex(socket.id)].roomName !== '') {
            socket.leave(socketClients[findIndex(socket.id)].roomName)
        }
    }
    const disconnectClient = () => {
        socket.emit('invaliduser')
    }
})

const findIndex = (userId: string): number => {
    return socketClients.findIndex((client) => {
        return client.id === userId
    })
}

app.use('/', express.static(path.join(__dirname, '../client')))
server.listen(port)
console.log(`Server started at http://localhost:${port}`)

server.on('connection', () => {
    app.get('/', (req: any, res: any) => {
        res.sendFile(path.resolve('index.html'))
    })
})
