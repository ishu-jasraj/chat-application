const socket = io();

socket.on('sendMessage',(msg,count)=>{
    if(msg == 'Welcome')
    console.log(`${msg} client ${count}`);
    else
    console.log(msg);
})

// document.querySelector("#msgBtn").addEventListener('click',()=>{
//     const clientMsg = document.querySelector("#msg").value;
//     socket.emit('msgAllClients',clientMsg);
// })

document.querySelector('#msg-form').addEventListener('submit',(e)=>{
    e.preventDefault();
const msg = e.target.elements.userMsg.value;
console.log("msg----",msg);
socket.emit('msgAllClients',msg);
});