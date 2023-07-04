const {Router} = require("express") 

const router = Router()

const ProductManager = require("../dao/managers/productDaoMongoose") 
const passport = require("passport")
const prodManager = new ProductManager()
const { getProducts,getProductId,postProduct,putProduct,deleteProduct } = require("../controllers/products.controller")



router.get("/",passport.authenticate("jwt",{session:false}),getProducts)

router.get("/:pid",getProductId)

router.post("/", postProduct)


//PUT

router.put("/:pid",putProduct)

//DELETE

router.delete("/:pid", deleteProduct)


module.exports = router