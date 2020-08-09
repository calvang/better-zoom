import { SSL_OP_NO_TICKET } from 'constants';
// import * as express from 'express';
const express = require('express')
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { v4: uuidV4 } = require('uuid');

app.use(express.static(__dirname + '/public'));
// app.set('view engine', 'html');
// app.use(express.static('public'));
//app.use('/assets', express.static(__dirname + '/dist'));

app.get('/',(req: any, res: any) => {
    res.redirect(`/${uuidV4()}`);
})

app.get('/:room', (req: any, res: any) => {
    res.render('room', { roomId: req.params.room });
})

io.on('connection', function(socket: any) {
    socket.on('join-room', function(roomId: any, userId: any) {
        console.log(roomId, userId)
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected', userId);
        socket.on('disconnect', () => {
            socket.to(roomId).broadcast.emit('user-disconnected', userId);
        })
    })
})
 
server.listen(5000)