const {Router} = require("express") 

const router = Router()

const ProductManager = require("../../productManager") 
const prodManager = new ProductManager("./data/products.json")



router.get("/",async(request,response)=>{
    try{
        let {limit} = request.query     // no olvidar del destructury 
        let productos = await prodManager.getProduct()
        if(!limit){
            response.send(productos).status(200)
        }
        else{
            response.send(productos.slice(0,limit)).status(200)
        }
    }
    catch(error){
        console.log(error).status(500)
    }
})
router.get("/:pid",async(request,response)=>{
    try{
        let id = await request.params.pid
        let producto = await prodManager.getProductById(id)   
        if(!producto){
            response.send("el producto no existe").status(400)
        }
        else{
            response.send(await producto).status(200)
        }


    }
    catch(error){ 
        console.log(error).status(500)
    }
})
//POST  http:localhost:8080/products

router.post("/", async (req,res)=>{    //
    try{

        let newProduct = await req.body
       console.log( await prodManager.addProduct(newProduct))
        res.status(200).send({newProduct})
    }
    catch(error){
        response.status(400).send({status:"error",mensaje:"algo salio mal"})
        console.log(error)
    }
})


//PUT

router.put("/:pid",async(req,res)=>{
    try{

        let {pid} = req.params
        modif = req.body
        res.status(200).send( await prodManager.updateProduct(pid,modif))
    }
    catch(error){
        res.status(500).send(error)
    }
 })

//DELETE

router.delete("/:pid", async(req,res)=>{
try{
    let {pid} = req.params
    res.status(200).send(await prodManager.deleteProduct(pid))
}
catch (error){
    res.status(500).send(error)
}
})


module.exports = router