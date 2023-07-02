const sleep = ms => new Promise (resolve => setTimeout(resolve, ms));

const ul = document.getElementById('message');
const text = document.getElementById('input');

function addMessage (isSelf, to, message) {
let li = document.createElement('li');
li.classList.add(isSelf ?'right' : 'left'); 
let span = document.createElement('span');
span.textContent = message;
li.appendChild(span);

let where = document.createElement('i');
span.textContent = to;
li.appendChild(where);
ul.appendChild();
}

let socket;

function join (id) {
    if (!socket || !socket.connected) return;
    socket.emit('join', { 
        id 
    });
    axios.get('http;//localhost:11001/chat/get/' + id)
        .then(function (response) {
            const isSelf = message.userId ==socket.id;
            for (const message of response.data){
                addMessage(isSelf, id + (isSelf?'' : '-' + message.userId), message.message);
    
            };
        });
}

function send (to, message) {
    if (!socket) return;
    socket.emit('send', { 
        to,
        message
    }, (p) => { 
        addMessage(true, to, message);
     });
}

async function start() {
socket = io('ws://localhost:11001');
socket.on('message', (payload) => {
    addMessage(payload.userId ==socket.id, payload.to + '-' + payload.userId, payload.message);
});
join('hello');
join('bye');
join('new');
}

document.getElementById('form').addEventListener('submit', (event) => {
    send (room.value, text.value);
    text.value = '';
    event.preventDefault();
    return false;
});
start();