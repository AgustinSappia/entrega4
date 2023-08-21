
const { userModel } = require("../dao/models/user.model")
const { userService } = require("../services")
const { logger } = require("../config/logger")


class UserController{

userGet =  async(req,res)=>{
        users = await userModel.find({})
        res.send(users)
    }

renderPremium = async(req,res)=>{
    try {

    let {uid} = req.params
    console.log(uid)
   res.render("premium",{uid})
    
} 
    catch (error) {
        console.log(error)
    }
  
}

premiumAndUser = async (req,res,next) => {
    try {
      let { uid } = req.params;
      const requiredNames = [ //valores que se necesitan para dar el premium 
        "identificacion",
        "Comprobante de domicilio",
        "Comprobante de estado de cuenta"
      ]
      // Eliminar las comillas del valor uid
      uid = uid.replace(/['"]+/g, '');
      let {value} = req.body;
      let user = await userModel.findOne({_id:uid})
      if(!user){
        res.send(JSON.stringify({error:"no found user"}));
      }
      if(value =="true"){
        const containsRequiredDocuments = requiredNames.every(requiredName =>
          user.documents.some(document => document.name.includes(requiredName))
        );
        if(containsRequiredDocuments){
          await userModel.findOneAndUpdate({_id:uid},{rol:"premium"})
          res.send(JSON.stringify("cambiado a premium"))
        }
        else{
          logger.error("no cuenta con la documentacion")
          res.send(JSON.stringify("no cuenta con la documentacion necesaria"))
        }
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
      const upload = req.files
      // console.log(upload)
      let uploaded = req.files.document.concat(req.files.profileImage,req.files.productImage)     // array con todos los archivos subidos
      let resUploaded = uploaded.map(elemento =>{   //array con los archivos resumidos
        return {
          name: elemento.filename,
          reference: elemento.fieldname
        }
      })
      console.log(resUploaded)
      console.log(uid)
      let usuario = await userModel.updateOne({_id:uid},{$push:{documents:{$each:resUploaded}}})    // agregamos el resumen de arcivos subidos al usuario

      res.sendStatus(200)
    } catch (error) {
     console.log(error)
    }

  }
}

module.exports = new UserController ()