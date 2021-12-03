const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//static folder
app.use(express.static(path.join(__dirname, 'public')));

//run when a client connects
io.on('connection', socket => {
    console.log("New ws connection");
    //to the single client
    socket.emit('message', 'Welcome to Chattapp');

    //broadcast when a user connects to all exept the user
    socket.broadcast.emit('message', 'A user has joined the chat');
});




const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));