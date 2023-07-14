const { logger } = require("../../config/logger")

const socket = io()
logger.info("este es el script")
let user
let chatBox = document.getElementById("chatbox")
Swal.fire({
    title:"Identificate",
    input:"text",
    text:"Ingresa Usuario",
    inputValidaton: (value)=>{
        return !value && "el nombre es obligatorio"
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value
    socket.emit("usuario",user)
})

chatBox.addEventListener("keyup",evt =>{
    if(evt.key === "Enter"){
        if(chatBox.value.trim().length>0){
            socket.emit("message",{
                user, message: chatBox.value
            })
            chatBox.value=""
        }
    }
})

socket.on("messageLogs",data =>{
    let log = document.getElementById("messageLogs")
    let message = ""
    data.forEach(async element => {
        message+= `<li>${element.user}:${element.message}</li>`
    });
    log.innerHTML = message
})

socket.on("newUserConected", data=>{
    if(!data){
        return
    }
    else{

        Swal.fire({
            toast: true,
            position:"top-right",
            timer: "10000",
            showConfirmButton: false,
            title:`${data} se ha unido al chat`,
            icon:"success"
        })
    }
})