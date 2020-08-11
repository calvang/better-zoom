import { SSL_OP_NO_TICKET } from 'constants';
const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { v4: uuidV4 } = require('uuid');

app.use(cors());
app.use(express.static('public'));
app.use(function(req: any, res: any, next: any) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req: any, res: any) => {
    console.log("Redirecting...")
    const newRoomId = uuidV4();
    //res.redirect(`/${newRoomId}`);
    res.send({ roomId: `${newRoomId}` });
})

app.get('/:room', (req: any, res: any) => {
    console.log("Rendering room...")
    res.render('room', { roomId: req.params.room });
})

io.on('connection', function(socket: any) {
    socket.on('join-room', function(roomId: any, userId: any) {
        console.log("Connecting to", roomId, userId)
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected', userId);
        socket.on('disconnect', () => {
            socket.to(roomId).broadcast.emit('user-disconnected', userId);
        })
    })
})
 
server.listen(5000)