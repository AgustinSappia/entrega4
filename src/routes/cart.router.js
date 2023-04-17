const {Router} = require("express")

const router = Router()

const CartManager = require("../../cartManager") 
const cartManager = new CartManager("./data/cart.json")

const ProductManager = require("../../productManager")
const productManager = new ProductManager("./data/products.json")

router.post("/",async(req,res)=>{
try{
    res.send(await cartManager.createCart())
}
catch(error){
    res.send("todo mal").status(500)
}
})

router.post("/:cid/products/:pid",async(req,res)=>{
    let{cid,pid} = req.params 
    let producto = await productManager.getProductById(pid);
    let carrito = await cartManager.searchCartById(cid);
    if(carrito==false || producto== false){
        res.send("ingrese datos validos").status(400)
    }
    else{
        res.send(await cartManager.addProduct(producto,carrito)).status(200)
    }

    

})


router.get("/:cid",async(req,res)=>{
    try{
    let {cid} = req.params
    res.send(await cartManager.searchCartById(cid)).status(200)

    }
    catch(error){
    res.send(error).status(500)
    }
})


module.exports = router