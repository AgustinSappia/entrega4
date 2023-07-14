const { cartService, productService } = require("../services")


class CartController{

  getCarts =  async (rec,res)=>{
        const carritos= await cartService.getCarts()
        res.send(carritos)
    }



postCarrito = async(req,res)=>{
    try{
        res.send(await cartService.createCart())
    }
    catch(error){
    res.status(500).send("Todo mal")
}
}

getCartId = async(req,res)=>{
    try{
    let {cid} = req.params
    const {products} =await cartService.searchCartById(cid)
    if (!products){
        res.status(404).send({status:"error", error:"404 not found"})
    }
    else{
        res.render("cart",{products,cid}) // no sacar objeto
    }

    }
    catch(error){
        req.logger.error(error)
    res.status(500).send(error)
    }
}

postProductInCart = async(req,res)=>{
    try{
        
        let{cid,pid} = req.params 
        req.logger.info(cid,pid)
        res.send( await cartService.postProductInCart(cid,pid))
    }
    catch(error){
        req.logger.error(error)
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
        let respuesta = await cartService.putProduct(cid,pid,update)  
        
        res.send ({status:"success", payload:respuesta})
    }
    catch(error){
        
        res.send({error:"el carrito no existe",payload:error})
    }
}

deleteProductInCart = async(req,res)=>{
    try{
        let{cid,pid} = req.params 
        let producto = await productService.getProductById(pid);//existe solo para la validaciom
        let carrito = await cartService.searchCartById(cid);//existe solo para la validacion
        if(carrito==false || producto== false){
            res.status(400).send("ingrese datos validos")
        }
        else{
            res.status(200).send(await cartService.deleteProduct(cid,pid))
        }
    }
    catch(error){
        req.logger.error(error)
    }

    
}

deleteCart = async(req,res)=>{
    try{
        let{cid} = req.params 
        let resp = await cartService.deleteCart(cid)
        res.send(await resp)
        }
        catch(error){
            res.status(404).send({payload:error})

        }
}

pucharse = async(req,res)=>{
    try {
        
        let {cid}=req.params
        let client = req.user.email

        let resp = await cartService.pucharseCart(cid,client)
        if(!resp){
            res.status(400).send({status:"error", payload:"No existe respuesta de compra"})
        }
        else{
            res.status(500).send(resp.result)
        }
    } catch (error) {
        res.status(500).send({payload:error})
    }
}

renderPucharse= async(req,res)=>{
    try {
        res.render("pucharse")
    } catch (error) {
        res.send(error)
    }
}


}


module.exports = new CartController ()
    
