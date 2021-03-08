// @ts-ignore
const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()
const moment = require('moment')

interface ISocketClient {
    id: string
    userUrlName: string
    roomName: string
    connectionTime: Date
}

interface IRoomPayload {
    roomName: string
    userUrlName: string
}

// fake DB
let socketClients: ISocketClient[] = []

// socket.io server
io.on('connection', (socket) => {
    //console.log('Socket : ', socket.id)
    socketClients.push({
        id: socket.id,
        userUrlName: '',
        roomName: '',
        connectionTime: new moment().format('YYYY-MM-DD HH:mm:ss'),
    })

    socket.on('disconnecting', () => {
        socketClients = socketClients.filter((client) => {
            return client.id !== socket.id
        })
        updateClientsInRooms()
    })

    socket.on('room', (payload: IRoomPayload) => {
        socket.join(payload.roomName)
        socketClients[findIndex(socket.id)].roomName = payload.roomName
        socketClients[findIndex(socket.id)].userUrlName = payload.userUrlName
        updateClientsInRooms()
    })
    socket.once('disconnect', () => {})

    function updateClientsInRooms() {
        socket.rooms.forEach((socketRoom) => {
            let clientsInRoom = socketClients.filter((client) => {
                return (client.roomName === socketRoom)
            })
            let usersInRoom = clientsInRoom.map((client)=> {return client.userUrlName})
            io.to(socketRoom).emit('users', JSON.stringify(usersInRoom))
        })
    }
})

const findIndex = (userId: string): number => {
    return socketClients.findIndex((client)=> {
        return client.id === userId
    })
}

nextApp.prepare().then(() => {
    app.get('*', (req, res) => {
        return nextHandler(req, res)
    })

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})
