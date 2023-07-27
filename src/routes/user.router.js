const {Router, json} = require("express")
const { userModel } = require("../dao/models/user.model")

const router = Router()

router.get("/",async(req,res)=>{
    users = await userModel.find({})
    res.send(users)
})

router.get("/premium/:uid", async(req,res)=>{
    try {

    let {uid} = req.params
   res.render("premium",{uid})
    
} 
    catch (error) {
        console.log(error)
    }
  
})

router.post("/premium/:uid", async (req,res,next) => {
    try {
      let { uid } = req.params;
      // Eliminar las comillas del valor uid
      uid = uid.replace(/['"]+/g, '');
      let {value} = req.body;
      let user = await userModel.findOne({_id:uid})
      if(!user){
        res.send(JSON.stringify({error:"no found user"}));
      }
      if(value =="true"){
        await userModel.findOneAndUpdate({_id:uid},{rol:"premium"})
        res.send(JSON.stringify("cambiado a premium"))
      }else{
        await userModel.findOneAndUpdate({_id:uid},{rol:"user"})
        res.send(JSON.stringify("cambiado a user"))
      }

    } catch (error) {
      next(error)
    }
  })








module.exports= router