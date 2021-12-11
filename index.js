const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const { isBooleanObject } = require('util/types');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//static folder
app.use(express.static(path.join(__dirname, 'public')));

//run when a client connects
io.on('connection', socket => {

    //to the single client
    socket.emit('message', 'Chatter Bot: Welcome to ChatterApp!');

    //broadcast when a user connects to all exept the user
    socket.broadcast.emit('message', 'Chatter Bot: A user has joined the chat');
    socket.on('disconnect', () => {
        //Emits to everyone a user left the chat
        io.emit('message', 'Chatter Bot: A user has left the chat');

    });

    //Listen for chatMessage
    socket.on('chatMessage', msg => {
        io.emit('message', msg);
    });

});




const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));