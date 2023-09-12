const {Router} = require("express")
const userController = require("../controllers/user.controller")
const { multerUpload } = require("../config/multerConfig")
const { passportCall } = require("../passport-jwt/passportCall")
const { authorization } = require("../passport-jwt/authorizationJwtRole")




const router = Router()

router.get("/",passportCall("jwt"),authorization(["admin"]),userController.userGet)
router.get("/detailed",passportCall("jwt"),authorization(["admin"]),userController.detailedUserGet)

router.get("/premium/:uid", userController.renderPremium)

router.post("/premium/:uid",passportCall("jwt"), userController.premiumAndUser)

router.post("/:uid/documents",multerUpload.fields([
    {name:"profileImage", maxCount: 1},
    {name:"productImage", maxCount: 1},
    {name:"document", maxCount: 3}
]),userController.postDocuments )

router.get("/documents",passportCall("jwt"),userController.renderDocuments)


router.delete('/delete',passportCall("jwt"),authorization(["admin"]) ,userController.deleteExpiredUser)

router.get("/admin",passportCall("jwt"),authorization(["admin"]), userController.adminGet)

router.delete("/deleteOne/:uid",passportCall("jwt"),authorization(["admin"]) , userController.deleteOne)

router.put("/changeRol",passportCall("jwt"),authorization(["admin"]), userController.changeRol)
  
//Tue Aug 22 2023 18:24:10 GMT-0300 (hora estándar de Argentina) data para testear






module.exports= router