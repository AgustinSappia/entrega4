const {Router} = require("express")
const { sendMail } = require("../utils/sendMail")
require("dotenv").config()
const router = Router()




router.get("/sms",(req,res)=>{
    
})



router.get("/mail",async(req,res)=>{

    // let to =""
    // let subject=""
    // let html=""

    // let result = await sendMail()

    res.render("mail")
})

router.post("/mail",async(req,res)=>{

     let mail=req.body

    let to =mail.to
    let subject=mail.subject
    let html=mail.html

    let result = await sendMail(to,subject,html)

    res.send("mail enviado")
})

module.exports= router