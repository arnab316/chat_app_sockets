const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const connect = require('./config/database-config'); 
const Chat = require('./models/chat');


io.on('connection', (socket)=>{
    console.log('A user connected ' + socket.id)


    socket.on('join_room', (data)=>{
        console.log('joining a room ' + data.roomid)
      socket.join(data.roomid, (data)=>{
        console.log('join room ' + data)
      })
    });

    socket.on('msg_send', async(data)=>{
        console.log(data)
        const chat = await Chat.create({
            roomId: data.roomid,
            content: data.message,
            user: data.username
        })
        io.to(data.roomid).emit('msg_received', data);
    })

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
})

app.set('view engine', 'ejs');
app.use('/',express.static(__dirname + '/public'));

app.get('/chat/:roomid', async(req, res) => {
    const chats = await Chat.find({
        roomId: req.params.roomid
    })
    res.render('index', {
        id: req.params.roomid,
        chats: chats
    })
})

server.listen(3000, ()=>{
 console.log(`Server listening on 3000`)
 connect().then(()=>{
    console.log('mongodb connection established')
 }).catch(err => console.log(err));
})