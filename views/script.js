

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