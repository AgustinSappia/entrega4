const productManager = require("../../../productManager")
const prodManag = new productManager("./data/products.json")

const socketProduct =async (io) =>{
    try{
        let productos = await prodManag.getProduct()
        io.on("connection",socket =>{
            console.log("holasas")
            socket.emit("productos",productos)
            socket.on("addProduct",async data =>{
                try{

                    console.log(data)
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