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
let channelUsers = {};

// socket.io server
io.on("connection", socket => {

    socket.on("channel", (qboxInfo) => {
        socket.join(qboxInfo.id)
        if (channelUsers[qboxInfo.id] === undefined) {
            channelUsers[qboxInfo.id] = []
        }
        channelUsers[qboxInfo.id].push({ id: socket.id, userName: qboxInfo.username, connectionTime: new moment().format("YYYY-MM-DD HH:mm:ss") })
        io.sockets.in(qboxInfo.id).emit("users", JSON.stringify(channelUsers[qboxInfo.id]))
    });

    socket.on('disconnecting', () => {
        const roomsArr = [...socket.rooms.keys()]
        const roomId = roomsArr[1]

        let index = -1;
        if (channelUsers[roomId].length >= 0) {
            index = channelUsers[roomId].findIndex(e => e.id == socket.id);
        }
        if (index >= 0)
            channelUsers[roomId].splice(index, 1);

        io.sockets.in(roomId).emit("users", JSON.stringify(channelUsers[roomId]))
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
