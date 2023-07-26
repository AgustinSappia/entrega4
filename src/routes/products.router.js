const {Router} = require("express") 

const router = Router()

const ProductManager = require("../dao/managers/productDaoMongoose") 
const passport = require("passport")
const prodManager = new ProductManager()
const { getProducts,getProductId,postProduct,putProduct,deleteProduct } = require("../controllers/products.controller")
const { authorization } = require("../passport-jwt/authorizationJwtRole")
const { passportCall } = require("../passport-jwt/passportCall")



router.get("/",passport.authenticate("jwt",{session:false}),getProducts)

router.get("/:pid",passportCall("jwt"),getProductId)

router.post("/", passportCall("jwt"),authorization(["admin","premium"]),postProduct)


//PUT

router.put("/:pid",passportCall("jwt"),authorization(["admin"]),putProduct)

//DELETE

router.delete("/:pid",passportCall("jwt"),authorization(["admin"]), deleteProduct)


module.exports = router