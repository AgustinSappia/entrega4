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
router.get("/logger",(req,res)=>{
    req.logger.fatal("fatal")
    req.logger.error("error")
    req.logger.warning("alerta")
    req.logger.info("info")
    req.logger.http("http")
    req.logger.debug("debug")
    res.send({message:"prueba de lloguer"})
})

// artillery quick --count 40 --num 50 "http://localhost:8080/pruebas/simple" -o simple.json
router.get("/simple",(req,res)=>{
   let suma = 0
   for (let i = 0; i < 1000000; i++) {
    suma +=i
   }
   res.send({suma})
})
// artillery quick --count 40 --num 50 "http://localhost:8080/pruebas/compleja" -o compleja.json
router.get("/compleja",(req,res)=>{
    let suma = 0
    for (let i = 0; i < 5e8; i++) {
     suma +=i
     }
     res.send ({suma})
 })

module.exports= router