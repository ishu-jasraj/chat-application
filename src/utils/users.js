let users = [];

//add a user
const addUser = ({id,username,room})=>{
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    //check if username or room is empty
    if(!username || !room)
    {
        return {
            error:'username and room is required!!'
        }
    }

    //check whether username is present for that room
    const existingUser = users.find((user)=>{
        return user.room == room && user.username == username;
    })

    //validate existing user
    if(existingUser)
    {
        return {
            error:'Username is in use!!'
        }
    }

    const user = {id,username,room};
    users.push(user);
    console.log("users----",users);
    return {user};
}

//remove a user
const removeUser = (id)=>{
    const index = users.findIndex((user)=>{
        return user.id == id;
    })

    if(index != -1)
    {
        return users.splice(index,1)[0];
    }
    
}

//get a user by id
const getUser = (id)=>{
    return users.find((user)=>users.id == id)
}

//get all users of a room
const getUsersOfARoom = (room)=>{
    return users.filter((user)=>user.room == room);
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersOfARoom
}