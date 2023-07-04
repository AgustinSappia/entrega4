const productManager = require("../../dao/managers/productDaoMongoose")
const prodManag = new productManager()

const socketProduct =async (io) =>{
    try{
        let productos = await prodManag.getProduct()
        io.on("connection",socket =>{
            socket.emit("productos",productos)
            socket.on("addProduct",async data =>{
                try{

                    
                    console.log( await prodManag.addProduct(data))
                }
                catch(error){
                    console.log(error)
                }
            })

        })
        
    }
    catch (error){
        console.log(error)
    }
}


module.exports = {
    socketProduct
}