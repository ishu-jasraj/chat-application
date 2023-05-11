const socket = io();

//elements
const $message_form = document.querySelector('#msg-form');
const $message_form_input = $message_form.querySelector('input'); 
const $message_form_button = $message_form.querySelector('button'); 
const $location_button = document.querySelector('#share-location');

socket.on('sendMessage',(msg,count)=>{
    if(msg == 'Welcome')
    console.log(`${msg} client ${count}`);
    else
    console.log(msg);
})


$message_form.addEventListener('submit',(e)=>{
    e.preventDefault();
    //disable button
    $message_form_button.setAttribute('disabled','disabled');

    const msg = e.target.elements.userMsg.value;
    socket.emit('msgAllClients',msg,(error)=>{
    //enable button
    $message_form_button.removeAttribute('disabled');
    $message_form_input.value='';
    $message_form_input.focus();
    if(error)
    {
        return console.log(error);
    }
    console.log("msg delivered to all users!!");
});
});

socket.on('userJoined',(user)=>{
console.log("user "+user+" joined the chatroom!!");
})

$location_button.addEventListener('click',()=>{
//disable location button
$location_button.setAttribute('disabled','disabled');

if(!navigator.geolocation)
{
    return alert('your browser does not support geolocation service!!');
}
navigator.geolocation.getCurrentPosition((position)=>{
    socket.emit('sendLoaction',{latitude:position.coords.latitude,longitude:position.coords.longitude},(ackMsg)=>{
        //enable location button
        $location_button.removeAttribute('disabled');
        console.log(ackMsg);
    });
});
});