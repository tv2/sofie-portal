"use strict";
exports.__esModule = true;
var express_1 = require("express");
var app = express_1["default"]();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
var settingsJson = require("../storage/settings.json");
var port = parseInt(process.env.PORT || '3000', 10) || 3000;
var dev = process.env.NODE_ENV !== 'production';
var moment = require('moment');
var socketClients = [];
var settings = settingsJson;
// socket.io server
io.on('connection', function (socket) {
    socketClients.push({
        id: socket.id,
        userUrlName: '',
        roomName: '',
        connectionTime: new moment().format('YYYY-MM-DD HH:mm:ss')
    });
    socket.emit('settings', JSON.stringify(settings));
    socket.on('disconnecting', function () {
        socketClients = socketClients.filter(function (client) {
            return client.id !== socket.id;
        });
        updateClientsInRooms();
    });
    socket.on('room', function (payload) {
        leaveRoom();
        joinRoom(payload);
        updateClientsInRooms();
    });
    socket.once('disconnect', function () { });
    function updateClientsInRooms() {
        settings.webpages.forEach(function (webpage) {
            var clientsInRoom = socketClients.filter(function (client) {
                return (client.roomName === webpage.id.toString());
            });
            var usersInRoom = clientsInRoom.map(function (client) { return client.userUrlName; });
            io.to(webpage.id.toString()).emit('users', JSON.stringify(usersInRoom));
        });
    }
    function joinRoom(payload) {
        socket.join(payload.roomName);
        socketClients[findIndex(socket.id)].roomName = payload.roomName;
        socketClients[findIndex(socket.id)].userUrlName = payload.userUrlName;
    }
    function leaveRoom() {
        if (socketClients[findIndex(socket.id)].roomName !== '') {
            socket.leave(socketClients[findIndex(socket.id)].roomName);
        }
    }
});
var findIndex = function (userId) {
    return socketClients.findIndex(function (client) {
        return client.id === userId;
    });
};
app.use('/', express_1["default"].static(path.join(__dirname, '..')));
server.listen(port);
console.log("Server started at http://localhost:" + port);
server.on('connection', function () {
    app.get('/', function (req, res) {
        res.sendFile(path.resolve('build/client/index.html'));
    });
});
