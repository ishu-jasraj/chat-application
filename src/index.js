const path = require('path');
const express = require('express');
const http = require('http');

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

const publicPath = path.join(__dirname,'../public');
app.use(express.static(publicPath));

app.get('/',(req,res)=>{
});

server.listen(port,()=>{
    console.log("server up and running on port ",port); 
})