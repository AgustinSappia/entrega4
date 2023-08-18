const {Router, json} = require("express")
const { userModel } = require("../dao/models/user.model")
const userController = require("../controllers/user.controller")
const { multerUpload } = require("../config/multerConfig")


const router = Router()

router.get("/",userController.userGet)

router.get("/premium/:uid", userController.renderPremium)

router.post("/premium/:uid", userController.premiumAndUser)

router.post("/:uid/documents",multerUpload.fields([
    {name:"profileImage", maxCount: 1},
    {name:"productImage", maxCount: 1},
    {name:"document", maxCount: 3}
]),userController.postDocuments )








module.exports= router