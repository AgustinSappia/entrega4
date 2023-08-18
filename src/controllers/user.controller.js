const { userModel } = require("../dao/models/user.model")


class UserController{

userGet =  async(req,res)=>{
        users = await userModel.find({})
        res.send(users)
    }

renderPremium = async(req,res)=>{
    try {

    let {uid} = req.params
   res.render("premium",{uid})
    
} 
    catch (error) {
        console.log(error)
    }
  
}

premiumAndUser = async (req,res,next) => {
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
  }

  postDocuments = async(req,res,next)=>{
    try {
      const {uid} = req.params
      console.log(req.files)
      console.log(uid)
      res.sendStatus(200)
    } catch (error) {
     console.log(error)
    }

  }
}

module.exports = new UserController ()