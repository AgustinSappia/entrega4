let carts=[]
const fs = require("fs")
const {cartsModel} = require("../models/carts.model")
const ProductManager = require("./productManagerMongoose")
const productManager = new ProductManager()
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
       let cart= await cartsModel.findOne({_id:id}).lean().populate("products.product")
       if(!cart){
        return console.log("el carrito no existe")
       }
       else{
           return cart
       }
    }
    catch(error){
        return error
    }
}

async addProduct(cid,pid,cantidadAgregado){
    try{
        if(!cid||!pid){
            return "no ingreso datos correctos"
        }
        let carrito = await cartsModel.findOne({_id:cid})
        let productos= carrito.products
        let index = productos.findIndex(objeto =>objeto.product == pid)
        if(index>=0){
            if(!cantidadAgregado){
                productos[index].cantidad++
            }
            else{
                productos[index].cantidad = productos[index].cantidad + cantidadAgregado
            }
        }
        else{
            if(!cantidadAgregado){
                productos.push({product: pid ,cantidad:1})
            }
            else{
                productos.push({product: pid ,cantidad:cantidadAgregado})
            }
        }
        let resp= await cartsModel.updateOne({_id:cid },carrito) 
        return resp



    }
    catch(error){
        console.log(error)
    }
}


async putProduct(cid,pid,update){
    try{
        let carrito = await cartsModel.findOne({_id:cid})

         let productos= carrito.products
         let index = productos.findIndex(objeto =>objeto.product == pid)

        const {cantidad}= update


         if(index>=0){
             productos[index].cantidad=cantidad
            return await cartsModel.updateOne({_id:cid},carrito)
         }
         else{
            return"no se encontro el producto"
         }
    }
    catch(error){
        console.log(error)
        return error
    }
}


async deleteProduct(cid,pid){
    try{
        if(!cid||!pid){
            return "no ingreso datos correctos"
        }
        let carrito = await cartsModel.findOne({_id:cid})
        let productos= carrito.products
        let index = productos.findIndex(objeto =>objeto.product == pid)

        if(index>=0){
            productos.splice(index,1)

        }
        else{
            return "el producto no existe"
        }
        let resp= await cartsModel.updateOne({_id:cid },carrito) 
        return resp
    }
    catch(error){
        return error
    }
}


}

module.exports = CartManagerMongo