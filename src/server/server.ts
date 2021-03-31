import express from 'express'
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const path = require('path')

import * as settingsJson from '../storage/settings.json'
import * as usersJson from '../storage/users.json'

import { ISettings, IWebPage } from '../model/settingsInterface'
import { IUser } from '../model/usersInterface'
import { ISocketClient } from '../model/socketClientInterface'
import {
    JOIN_ROOM,
    THIS_USER,
    USERS_IN_ROOM,
    WEBPAGES,
} from '../model/socketConstants'
import {logger} from "./utils/logger";

const port: number = parseInt(process.env.PORT || '3000', 10) || 3000
const moment = require('moment')

let socketClients: ISocketClient[] = []
let settings: ISettings = settingsJson
let users: IUser[] = usersJson.users
logger.debug("Settings", settings);

// socket.io server
io.on('connection', (socket: any) => {
    const userUrlName = socket.handshake.headers.userurl
    const thisUser: IUser = users.find(
        (userId: IUser) => userId.id === userUrlName
    ) || {
        id: userUrlName,
        name: '',
        accessRights: [],
    }
    socketClients.push({
        id: socket.id,
        userUrlName: userUrlName,
        roomName: '-1',
        connectionTime: new moment().format('YYYY-MM-DD HH:mm:ss'),
    })

    logger.debug(`Number of active sockets: ${socketClients.length}`)
    socket.emit(THIS_USER, thisUser)

    const accessToPages: IWebPage[] = settings.webpages.filter((webpage: IWebPage) => {
        return thisUser.accessRights.find((access) => {
            return access.webpageId === webpage.id
        })
    })
    socket.emit(WEBPAGES, accessToPages)

    socket.on('disconnecting', () => {
        socketClients = socketClients.filter((client) => {
            return client.id !== socket.id
        })
        updateClientsInRooms()
    })

    socket.on(JOIN_ROOM, (room: string) => {
        logger.debug(`Socket.on('room') payload: ${room}`)
        leaveRoom()
        joinRoom(room)
        updateClientsInRooms()
    })

    socket.once('disconnect', () => {
        logger.debug(`Socket with id: ${socket.id} disconnected`)
    })

    const updateClientsInRooms = () => {
        settings.webpages.forEach((webpage) => {
            let clientsInRoom = socketClients.filter((client) => {
                return client.roomName === webpage.id.toString()
            })
            let usersUrlInRoom: IUser[] = clientsInRoom.map((client) => {
                return users.find((user: IUser) => {
                    return client.userUrlName === user.id
                })
            })
            let usersInRoom: string[] = usersUrlInRoom.map((user: IUser) => {
                if (user) {
                    return user.name
                }
            })
            io.to(webpage.id.toString()).emit(
                USERS_IN_ROOM,
                usersInRoom
            )
        })
    }


    const joinRoom = (room: string) => {
        logger.debug(`Socket with id: ${socket.id} joined room: ${room}`)
        socket.join(room)
        socketClients[findIndex(socket.id)].roomName = room
    }

    const leaveRoom = () => {
        if (socketClients[findIndex(socket.id)].roomName !== '') {
            logger.debug(`Socket with id: ${socket.id} left room: ${socketClients[findIndex(socket.id)].roomName}`)
            socket.leave(socketClients[findIndex(socket.id)].roomName)
        }
    }
})

const findIndex = (userId: string): number => {
    return socketClients.findIndex((client) => {
        return client.id === userId
    })
}

app.use('/', express.static(path.join(__dirname, '../client')))
server.listen(port)
logger.info(`Server started at http://localhost:${port}`)

server.on('connection', () => {
    app.get('/', (req: any, res: any) => {
        res.sendFile(path.resolve('index.html'))
    })
})
