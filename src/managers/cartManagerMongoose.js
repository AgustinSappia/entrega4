let carts=[]
const fs = require("fs")
const {cartsModel} = require("../models/carts.model")
const ProductManager = require("../managers/productManagerMongoose")
const productManager = new ProductManager("./data/products.json")
class CartManagerMongo{
 

async GetCarts(){
    try{
            return await cartsModel.find()
        }
    catch(error){
        console.log(error)
     }
}

async createCart(){
    try{
        console.log("carrito creando")
        return await cartsModel.create({products:[]})
    }
    catch(error){ 
    console.log(error)
    }
}

async searchCartById(id){
    try{
        return await cartsModel.findOne({_id:id})
    }
    catch(error){
        console.log("el carrito no existe"+error)
        return false
    }
}

async addProduct(cid,pid){
    try{

        let carritoOriginal = await cartsModel.findOne({_id:cid})
        let product = await productManager.getProductById(pid)

        
 
        let productosCarrito = carritoOriginal.products
        let indexProducto = productosCarrito.findIndex(produto => produto._id === pid)
 
        console.log(indexProducto)

        if(indexProducto>=0){
            
            let indexProducto = productosCarrito.findIndex(produto => produto._id === pid)
            productosCarrito[indexProducto].cantidad++
        }
        else{
            productosCarrito.push({_id:product._id,cantidad:1})
        }
        
        let cartRemplazar={
                products: productosCarrito
        }
        return cartsModel.replaceOne({_id:cid},cartRemplazar)
    }
    catch(error){
        console.log(error)
    }
}



}

module.exports = CartManagerMongo