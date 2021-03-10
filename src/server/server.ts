import express from 'express'
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const path = require('path')

import * as settingsJson from '../storage/settings.json'
import {ISettings} from "../model/settingsInterface";
import { ISocketClient, IRoomPayload } from  '../model/socketClientInterface'

const port: number = parseInt(process.env.PORT || '3000', 10) || 3000
const dev: boolean = process.env.NODE_ENV !== 'production'
const moment = require('moment')

let socketClients: ISocketClient[] = []
let settings: ISettings = settingsJson

// socket.io server
io.on('connection', (socket: any) => {
    socketClients.push({
        id: socket.id,
        userUrlName: '',
        roomName: '',
        connectionTime: new moment().format('YYYY-MM-DD HH:mm:ss'),
    })

    socket.emit('settings', JSON.stringify(settings))

    socket.on('disconnecting', () => {
        socketClients = socketClients.filter((client) => {
            return client.id !== socket.id
        })
        updateClientsInRooms()
    })

    socket.on('room', (payload: IRoomPayload) => {
        leaveRoom()
        joinRoom(payload)
        updateClientsInRooms()
    })

    socket.once('disconnect', () => {})

    function updateClientsInRooms() {
        settings.webpages.forEach((webpage) => {
            let clientsInRoom = socketClients.filter((client) => {
                return (client.roomName === webpage.id.toString())
            })
            let usersInRoom = clientsInRoom.map((client)=> {return client.userUrlName})
            io.to(webpage.id.toString()).emit('users', JSON.stringify(usersInRoom))
        })
    }

    function joinRoom(payload: IRoomPayload) {
        socket.join(payload.roomName)
        socketClients[findIndex(socket.id)].roomName = payload.roomName
        socketClients[findIndex(socket.id)].userUrlName = payload.userUrlName
    }

    function leaveRoom() {
        if (socketClients[findIndex(socket.id)].roomName !== '') {
            socket.leave(socketClients[findIndex(socket.id)].roomName)
        }
    }
})

const findIndex = (userId: string): number => {
    return socketClients.findIndex((client)=> {
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
