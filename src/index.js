const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words');

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))
let clients = 0;
const welcomeMessage = 'Welcome';

io.on('connection', (socket) => {
    clients++;
    console.log('New WebSocket connection ',clients);
    socket.broadcast.emit('userJoined',clients);
    socket.emit('sendMessage',welcomeMessage,clients);
    const filter = new Filter();
    socket.on('msgAllClients',(msg,cb)=>{
        if(filter.isProfane(msg))
        {
            return cb('profanity is not allowed!!');
        }
        io.emit('sendMessage',msg);
        cb();
    })

    socket.on('disconnect',()=>{
        io.emit('sendMessage','user got disconnected');
    })
    
    socket.on('sendLoaction',(data,cb)=>{
        const msg = `https://google.com/maps?q=${data.latitude},${data.longitude}`;
        io.emit('sendMessage',msg);
        cb('location shared!!');
    });
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})