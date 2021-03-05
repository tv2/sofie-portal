// @ts-ignore
const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();
const moment = require("moment");

// fake DB
let roomUsers = {};

// socket.io server
io.on("connection", socket => {

    socket.on("room", (roomInfo) => {
        socket.join(roomInfo.id)
        if (roomUsers[roomInfo.id] === undefined) {
            roomUsers[roomInfo.id] = []
        }
        roomUsers[roomInfo.id].push({ id: socket.id, userName: roomInfo.username, connectionTime: new moment().format("YYYY-MM-DD HH:mm:ss") })
        io.sockets.in(roomInfo.id).emit("users", JSON.stringify(roomUsers[roomInfo.id]))
    });

    socket.on('disconnecting', () => {
        const roomsArr = [...socket.rooms.keys()]
        const roomId = roomsArr[1]

        let index = -1;
        if (roomUsers[roomId].length >= 0) {
            index = roomUsers[roomId].findIndex(e => e.id == socket.id);
        }

        if (index >= 0) {
            roomUsers[roomId].splice(index, 1);
        }

        io.sockets.in(roomId).emit("users", JSON.stringify(roomUsers[roomId]))
    });

    socket.once("disconnect", () => {
    });
});

nextApp.prepare().then(() => {
    app.get("*", (req, res) => {
        return nextHandler(req, res);
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
