const {Router} = require("express")
const router = Router()



router.get("/",(req,res)=>{
    req.logger.fatal("fatal")
    req.logger.error("error")
    req.logger.warning("alerta")
    req.logger.info("info")
    req.logger.http("http")
    req.logger.debug("debug")
    res.send({message:"prueba de lloguer"})
})



module.exports= router