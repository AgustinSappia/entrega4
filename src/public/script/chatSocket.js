const { chatsModel } = require("../../models/chats.models")


let messages=[]

const chatSocket = (io)=>{

    io.on("connection",socket=>{
        socket.on("message",data=>{
            chatsModel.create(data)     //guardo la info con mongoose
            messages.push(data)
            console.log(messages)
            io.emit("messageLogs",messages)
        })
        socket.on("usuario",data=>{
            socket.broadcast.emit("newUserConected", data)
        })
    })

}


module.exports = {chatSocket}