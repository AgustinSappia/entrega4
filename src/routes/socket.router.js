const {Router} = require("express")
const router = Router()
const ProductManager = require("../managers/productManager");
const ProductDaoMongo = require("../dao/managers/productDaoMongoose");
prodManagerMongo= new ProductDaoMongo()
let prodManager=new ProductManager()

router.get("/aleatorio", async(req,res)=>{
    try{

        let productos = await prodManagerMongo.getProduct()
        
        let producto = productos[Math.floor(Math.random()*8)]
        let testUser= producto
        res.render("index", testUser)
    }
    catch(error){
        console.log(error)
    }
})

router.get("/prodStatic", async(req,res)=>{
    try{

        let productos = await prodManagerMongo.getProduct()
        
        
        res.render("estatico",{productos})
    }
    catch(error){
        console.log(error)
    }
} )

router.get("/productosSocket",async (req,res)=>{
    try{
        res.render("productosSocket")
    }
    catch(error){
        console.log(error)
    }

})

router.get("/chatSocket", (req,res)=>{
    res.render("chatSocket")
})



module.exports = router