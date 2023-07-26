const {Router} = require("express")
const router = Router()
const ProductManager = require("../managers/productManager");
const ProductDaoMongo = require("../dao/managers/productDaoMongoose");
const { passportCall } = require("../passport-jwt/passportCall");
const { authorization } = require("../passport-jwt/authorizationJwtRole");
let prodManagerMongo= new ProductDaoMongo()


router.get("/aleatorio", async(req,res)=>{
    try{

        let productos = await prodManagerMongo.getProduct()
        
        let producto = productos[Math.floor(Math.random()*8)]
        let testUser= producto
        res.render("index", testUser)
    }
    catch(error){
        req.logger.error(error)
    }
})

router.get("/prodStatic", async(req,res)=>{
    try{

        let productos = await prodManagerMongo.getProduct()
        
        
        res.render("estatico",{productos})
    }
    catch(error){
        req.logger.error(error)
    }
} )

router.get("/productosSocket",async (req,res)=>{
    try{
        res.render("productosSocket")
    }
    catch(error){
        req.logger.error(error)
    }

})

router.get("/chatSocket", passportCall("jwt"),authorization(["user"]),(req,res)=>{
    res.render("chatSocket")
})



module.exports = router