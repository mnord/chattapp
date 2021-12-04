const chatForm = document.getElementById('chat-form');
const messages = document.getElementById('messages');

const socket = io();

//message from server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    //scroll down
    //messages.scrollTop = messages.scrollHeight;
});

//message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //get message text
    const msg = e.target.elements.inputmsg;
    if (msg.value) {
        socket.emit('chatMessage', msg.value);
        msg.value = '';
    }
    msg.focus();
    
});

//Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="text">${message}</p>`;
    document.getElementById('messages').appendChild(div);
}