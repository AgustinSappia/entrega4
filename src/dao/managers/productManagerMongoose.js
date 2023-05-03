
const fs = require("fs")
const {productsModel} = require("../models/product.model")
let products=[]
class ProductManagerMongo{

    async addProduct(product){
      try{
        let products = await this.getProduct()
        if (!product.thumbnail){
          product.thumbnail = "no image"
        }
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
          return "Error: todos los campos son obligatorios";
        }
        const existingProduct = products.find(prod => prod.code === product.code);
        if (existingProduct) {
          return "Error: el código ya está en uso";
        }
        
        const newProduct = {
          ...product,
          status: true
        };
        return await productsModel.create(newProduct)
      }
      catch(error){
        return new Error(error)
      }
    }

    
    
    async getProduct(){
      try{
        return await productsModel.find()
    }
    catch (error){
        return new Error(error)
    }
}
 async getProductById(id){
  try{
    return productsModel.findOne({_id:id})
  }
  catch(error){
     return error
  }
  
}


async updateProduct(id,update){
  try{
    
    return await productsModel.updateOne({_id:id},update)
  }
  catch(error){
    console.log(error)
  }
  
}

async deleteProduct(id){
  try{
    return productsModel.deleteOne({_id: id})
  }
  catch(error){
    return error
  }
  
}
}


module.exports = ProductManagerMongo



