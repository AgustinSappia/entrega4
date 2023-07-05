const {Router} = require("express")
require("dotenv").config()
const router = Router()

const nodemailer= require("nodemailer")


router.get("/sms",(req,res)=>{
    
})

const transport = nodemailer.createTransport({
    service:"gmail",
    port:587,
   
    auth:{
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS_APP
    }
})

router.get("/mail",async(req,res)=>{
    console.log(process.env.GMAIL_USER)
    let result = await transport.sendMail({ 
        from:"coder Test <Holis>",
        to:"agustinsappia12@gmail.com",
        subject:"correo de prueba",
        html: `<div> 
                    <h1>Esto es un texto del test</h1>
                </div>`,
        attachments:[]
    })

    res.send("mail enviado")
})

module.exports= router