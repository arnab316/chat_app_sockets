const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket)=>{
    console.log('A user connected ' + socket.id)

    socket.on('clientEvent', (data) => {
        console.log('Received data from client:', data);
        
        // Send a message to the client
        io.emit('message', { message: 'Hello from server' });
        
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
})

app.use('/',express.static(__dirname + '/public'));

server.listen(3000, ()=>{
 console.log(`Server listening on 3000`)
})