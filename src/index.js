const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

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
    socket.emit('sendMessage',welcomeMessage,clients);

    socket.on('msgAllClients',(msg)=>{
        io.emit('sendMessage',msg);
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})