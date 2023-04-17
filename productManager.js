
const fs = require("fs")
let products=[]
class ProductManager{

    constructor(path){
      this.products=products
      this.count = "0"
      this.path=path
    }

    generarIdUnico = () => { 
      return Math.random().toString(30).substring(2);           
  } 
    async addProduct(product){
      try{
        let products = await this.getProduct()
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
          return "Error: todos los campos son obligatorios";
        }
        const existingProduct = this.products.find(prod => prod.code === product.code);
        if (existingProduct) {
          return "Error: el código ya está en uso";
        }
        
        const newProduct = {
          ...product,
          id: this.generarIdUnico(),
          status: true
        };
        this.products.push(newProduct);
        let objsJson =JSON.stringify(products,"null",2) 
        await fs.promises.writeFile(this.path,objsJson)
        return "Producto agregado correctamente"
      }
      catch(error){
        return error
      }
    }

    
    
    async getProduct(){
      try{
        const data = await fs.promises.readFile(this.path, 'utf-8')
        this.products = JSON.parse(data);
        return this.products
    }
    catch (error){
        return this.products
    }
}
 async getProductById(id){
  try{

    let productos = await this.getProduct()
    const product = productos.find(prod=> prod.id == id)
    if(!product) return false
    return product
  }
  catch(error){
     return error
  }
  
}


async updateProduct(id,update){
  let producto = await this.getProductById(id)


  producto.title = update.title || producto.title
  producto.description = update.description || producto.description
  producto.price = update.price || producto.price
  producto.thumbnail = update.thumbnail || producto.thumbnail
  producto.stock = update.stock || producto.stock
  producto.code= update.code || producto.code
  await fs.promises.writeFile(this.path, JSON.stringify(this.products,'utf-8','\t'))
  return 'Producto Actualizado'
  
}

async deleteProduct(id){
  try{
    this.products=await this.getProduct()
    const objeto = this.products.filter(prod => prod.id === id) 
    if (objeto.length === 0) {return 'Producto no encontrado'}
    const removedArray= this.products.filter(prod => prod.id!==id)
    await fs.promises.writeFile(this.path, JSON.stringify(removedArray,'utf-8','\t'))
    return 'Producto eliminado'
  }
  catch(error){
    return error
  }
  
}
}


module.exports = ProductManager



