document.addEventListener('DOMContentLoaded', (event) => {
    // Initialize socket connection
    const socket = io();

    // Example event handling
    socket.on('connect', () => {
        console.log('Connected to the server');
    });

    socket.on('message', (data) => {
        console.log('Message from server:', data);
    });

    // Example emitting an event to the server
    socket.emit('clientEvent', { message: 'Hello from client' });


});

const socket = io();
let btn = document.getElementById('btn');
btn.addEventListener('click', ()=>{
    socket.emit('clientEvent', { message: 'Button clicked' });
})