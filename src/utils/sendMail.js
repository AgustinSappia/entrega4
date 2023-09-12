
const nodemailer= require("nodemailer")

const transport = nodemailer.createTransport({
    service:"gmail",
    port:587,
   
    auth:{
        user: "agustinsappia12@gmail.com",
        pass: "ljvhrigukagczfty"
    }
})





exports.sendMail = async(to,subject,html)=>{

    return await transport.sendMail({ 
        from:"Server",
        to:to,
        subject:subject,
        html: html,
        attachments:[]
    })
} 

