const { cartService, productService } = require("../services")

const cartManager = cartService
const productManager = productService

class CartController{

  getCarts =  async (rec,res)=>{
        const carritos= await cartManager.GetCarts()
        res.send(carritos)
    }



postCarrito = async(req,res)=>{
    try{
        res.send(await cartManager.createCart())
    }
    catch(error){
    res.status(500).send("todo mal")
}
}

getCartId = async(req,res)=>{
    try{
    let {cid} = req.params
    const {products} =await cartManager.searchCartById(cid)

    res.render("cart",{products})

    }
    catch(error){
        console.log(error)
    res.send(error).status(500)
    }
}

postProductInCart = async(req,res)=>{
    try{
        
        let{cid,pid} = req.params 
        let producto = await productManager.getProductById(pid);

        let carrito = await cartManager.searchCartById(cid);
        if(carrito==false || producto== false){
            res.send("ingrese datos validos").status(400)
        }
        else{
            res.send(await cartManager.addProduct(cid,pid)).status(200)
        }
    }
    catch(error){
        console.log(error)
    }
}

putCart = async(req,res)=>{
    try{
        let {cid}=req.params
        let update = req.body
        
        let respuesta=await cartsModel.updateOne({_id:cid},{products:update})
        res.send ({status:"success", payload:respuesta})
    }
    catch(error){
        
        res.send({error:"el carrito no existe",payload:error})
    }
}

putProductInCart = async(req,res)=>{
    try{
        let {cid,pid}=req.params
        let update = req.body
        let respuesta = await cartManager.putProduct(cid,pid,update)  
        
        res.send ({status:"success", payload:respuesta})
    }
    catch(error){
        
        res.send({error:"el carrito no existe",payload:error})
    }
}

deleteProductInCart = async(req,res)=>{
    try{
        
        let{cid,pid} = req.params 
        let producto = await productManager.getProductById(pid);//existe solo para la validaciom
        let carrito = await cartManager.searchCartById(cid);//existe solo para la validacion
        if(carrito==false || producto== false){
            res.status(400).send("ingrese datos validos")
        }
        else{
            res.status(200).send(await cartManager.deleteProduct(cid,pid))
        }
    }
    catch(error){
        console.log(error)
    }

    
}

deleteCart = async(req,res)=>{
    try{
        let{cid} = req.params 
        let resp = await cartsModel.findOneAndUpdate(
            {_id:cid},
            {$set:{products:[]}},
            {new: true}
            )

          if(!resp){
            console.log("error")
          }
          else{
              res.send(resp)
          }
        }
        catch(error){
            res.status(404).send({payload:error})

        }
}


}


module.exports = new CartController ()
    
