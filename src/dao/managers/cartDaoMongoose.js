
const { v4: uuidv4 } = require('uuid');
const uniqueCode = uuidv4();
const {cartsModel} = require("../models/carts.model")
const { productsModel } = require("../models/product.model")
const { ticketModel } = require("../models/ticket.model")
const ProductManager = require("./productDaoMongoose")
const productManager = new ProductManager()

class CartDaoMongo{
 

async getCarts(){
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
        let producto = await productsModel.findOne({_id:pid});

        let carrito = await this.searchCartById(cid);
        if(carrito==false || producto== false){
            return"ingrese datos validos"
        }

        let productos= carrito.products
        let index = productos.findIndex(objeto =>objeto.product._id == pid)
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

async deleteCart(cid){
    try {
        await cartsModel.findOneAndUpdate(
            {_id:cid},
            {$set:{products:[]}},
            {new: true}
            )
          if(!resp){
            return {error:"no se encontro el cart"}
          }
          else{
              return resp
          }
        
    } catch (error) {
        return error
    }
}

async pucharseCart(cid,client){
    try{

        let cart = await cartsModel.findById({_id:cid})
        let result= {comprados:[],fallados:[]}

        await Promise.all( //Usamos Promise.all para esperar a que se completen todas las promesas generadas por las operaciones asíncronas dentro del map.

        cart.products.map(async producto=>{    //Utilizamos map en lugar de forEach para iterar sobre los productos del carrito. Esto nos permite obtener un array de promesas.    
            const product = await productsModel.findById(producto.product);
                if((product.stock - producto.cantidad)<0){
                    result.fallados.push(product)

                }
                else{
                    product.stock = product.stock - producto.cantidad
                    let update = await productsModel.findOneAndUpdate({_id:producto.product},product,{new:true})
                    result.comprados.push(product)

                }
            })
            )

        let filtro= cart.products.filter(objeto => {
            objeto.product === result.fallados._id
        })
        const idsArray = result.fallados.map(obj => obj._id.toString()); //creamos un array solamente con la id del array de fallados, el toString esta para quitar el newObjetId("")
        const nuevoCart = cart.products.filter(obj => idsArray.includes(obj.product.toString()))
        cart.products=nuevoCart

        await cartsModel.findByIdAndUpdate({_id:cid},cart)

        let precioTotal = result.comprados.reduce ((total,producto)=> total+producto.price, 0)
        const ticket = await ticketModel.create({

            purcharser: client,
            code:uuidv4(),
            products: result.comprados,
            amount:precioTotal,

        })

        return {ticket,result}
        
    }
    catch(error){
        console.log(error)
        throw error //throw error se utiliza en el bloque catch para lanzar la excepción capturada hacia arriba y permitir que sea manejada en un nivel superior
    }
}

}

module.exports = CartDaoMongo