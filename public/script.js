// document.addEventListener('DOMContentLoaded', (event) => {
//     // Initialize socket connection
//     const socket = io();

//     // Example event handling
//     socket.on('connect', () => {
//         console.log('Connected to the server');
//     });

//     socket.on('message', (data) => {
//         console.log('Message from server:', data);
//     });

//     // Example emitting an event to the server
//     socket.emit('clientEvent', { message: 'Hello from client' });


// });

const socket = io();
let newmsg = document.getElementById('newmsg');
let btn = document.getElementById('btn');
let msglist = document.getElementById('msglist');

btn.onclick = (e) =>{
    e.preventDefault();
    socket.emit('msg_send', { message: newmsg.value });
    newmsg.value = '';
}

socket.on('msg_received', (data) => {
    msglist.innerHTML += `<li>${data.message}</li>`;
})