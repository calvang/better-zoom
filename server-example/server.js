"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { SSL_OP_NO_TICKET } from 'constants';
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var uuidV4 = require('uuid').v4;
app.set('view engine', 'ejs');
app.use(express_1.default.static('public'));
app.get('/', function (req, res) {
    res.redirect("/" + uuidV4());
});
app.get('/:room', function (req, res) {
    res.render('room', { roomId: req.params.room });
});
io.on('connection', function (socket) {
    socket.on('join-room', function (roomId, userId) {
        console.log(roomId, userId);
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected', userId);
        socket.on('disconnect', function () {
            socket.to(roomId).broadcast.emit('user-disconnected', userId);
        });
    });
});
server.listen(3000);
