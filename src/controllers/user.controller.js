
const { userModel } = require("../dao/models/user.model")
const { userService } = require("../services")
const { logger } = require("../config/logger")
const { sendMail } = require("../utils/sendMail")
const { json } = require("express")


class UserController{

userGet =  async(req,res)=>{
  const users = await userModel.find({});
  const resumeArray = users.map((user) => ({
    first_name: user.first_name,
    last_name: user.last_name,
    rol: user.rol,
    email: user.email,
  }))
  const formattedUsers = JSON.stringify(resumeArray, null, 2); // 2 espacios de indentación para formatear
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(formattedUsers);
    }

  detailedUserGet = async(req,res)=>{
    const users = await userModel.find({});
    const formattedUsers = JSON.stringify(users, null, 2); // 2 espacios de indentación para formatear
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(formattedUsers);
      }

renderPremium = async(req,res)=>{
    try {
      let {uid} = req.params
      res.render("premium",{uid})
    
} 
    catch (error) {
        logger.error(error)
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
      const documentFiles = req.files.document || [];
      const profileImageFiles = req.files.profileImage || [];
      const productImageFiles = req.files.productImage || [];
      let uploaded = documentFiles.concat(profileImageFiles,productImageFiles)     // array con todos los archivos subidos
      console.log(uploaded)
      let resUploaded = uploaded.map(elemento =>{   //array con los archivos resumidos
        return {
          name: elemento.filename,
          reference: elemento.fieldname
        }
      })
      let usuario = await userModel.updateOne({_id:uid},{$push:{documents:{$each:resUploaded}}})    // agregamos el resumen de arcivos subidos al usuario

      res.sendStatus(200)
    } catch (error) {
     next(error)
    }

  }

  renderDocuments = async(req,res)=>{

    let user =await userModel.findOne({email:req.user.email})
    res.render("documentUpload",user)
  }

  deleteExpiredUser = async (req, res) => {
    try {
      // Calcula la fecha hace dos días
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  
      const usersToDelete = await userModel.find({ lastConection: { $lt: twoDaysAgo } });

      for (const user of usersToDelete) {
        const userEmail = user.email; 
        await userModel.deleteOne({ _id: user._id }); 
        sendMail(userEmail,"Cuenta Eliminada",`
                <div>
                    <h1>hola</h1>
                    <p>Su cuenta fue eliminada </p>
                </div>
                `)
      }
  
      if (usersToDelete.length > 0) {
        return res.json({ message: `${usersToDelete.length} usuarios eliminados` });
      } else {
        return res.json({ message: 'No se encontraron usuarios inactivos' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Error al eliminar usuarios inactivos', message: error.message });
    }
  }



  adminGet = async (req,res)=>{
    let users = await userModel.find({}).lean()
    res.render("admin",{users}) }


  deleteOne = async(req,res,next)=>{
    try{
      const {uid} = req.params
      let response = await userModel.deleteOne({_id:uid})
      res.status(200).send({messaje:"todo bien", resp:response})
    }
    catch(error){
      logger.error(error)
      next(error)
    }
  }

  changeRol =  async(req,res,next)=>{
    try{
      const {userId,userRol} = req.body
      let response = await userModel.findByIdAndUpdate({_id:userId},{rol: userRol})
      res.status(200).send({messaje:"todo bien", resp:response})
    }
    catch(error){
      logger.error(error)
      next(error)
    }
  }



}

module.exports = new UserController ()