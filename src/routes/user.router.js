const {Router, json} = require("express")
const { userModel } = require("../dao/models/user.model")
const userController = require("../controllers/user.controller")
const { multerUpload } = require("../config/multerConfig")
const { passportCall } = require("../passport-jwt/passportCall")


const router = Router()

router.get("/",userController.userGet)

router.get("/premium/:uid", userController.renderPremium)

router.post("/premium/:uid", userController.premiumAndUser)

router.post("/:uid/documents",multerUpload.fields([
    {name:"profileImage", maxCount: 1},
    {name:"productImage", maxCount: 1},
    {name:"document", maxCount: 3}
]),userController.postDocuments )

router.get("/documents",passportCall("jwt"),async(req,res)=>{

    let user =await userModel.findOne({email:req.user.email})
    console.log(user)
    res.render("documentUpload",user)
})






module.exports= router