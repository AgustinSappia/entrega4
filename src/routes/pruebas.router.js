const {Router} = require("express")
const router = Router()
const ProductManager = require("../managers/productManager");
let prodManager=new ProductManager("./data/products.json")

router.get("/aleatorio", async(req,res)=>{
    try{

        let productos = await prodManager.getProduct()
        
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

        let productos = await prodManager.getProduct()
        let testUser={productos}
        
        res.render("estatico",testUser)
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



module.exports = router