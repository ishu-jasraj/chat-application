const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')
const {addUser,getUser,removeUser,getUsersOfARoom,users} = require('./utils/users');

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('New WebSocket connection')
    
    
    //when a new user joins a chat room
    socket.on('join',(({username,room},cb)=>{
        //add user
        const {error,user} = addUser({id:socket.id,username,room});
        
        if(error)
        {
            return cb(error);
        }
        
        //make client join that room
        socket.join(user.room);
        //send welcome message to new client
        socket.emit('message', generateMessage('Welcome!'))
        //new user joined message to all of that room
        cb();
        socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has joined!`))
    }));
    
    
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        const filter = new Filter()
        
        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }

            io.to(user.room).emit('message', generateMessage(message))
            callback()
        
    })
    
    socket.on('sendLocation', (coords, callback) => {
        const user = getUser(socket.id);
      
        io.to(user.room).emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback()
     
    })

    socket.on('disconnect', () => {
        const removedUser = removeUser(socket.id);
        if(removedUser)
        io.to(removedUser.room).emit('message', generateMessage(`${removedUser.username} has left!`))
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})