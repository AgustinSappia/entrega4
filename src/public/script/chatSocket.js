

let messages=[]

const chatSocket = (io)=>{

    io.on("connection",socket=>{
        socket.on("message",data=>{
            messages.push(data)
            io.emit("messageLogs",messages)
        })
        socket.on("usuario",data=>{
            socket.broadcast.emit("newUserConected", data)
        })
    })

}


module.exports = {chatSocket}