const mongoose = require("mongoose");

const collection = "carts"

const productsSchema= new mongoose.Schema({

    products: [{ 
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
        },
        cantidad:Number,

    }]

})

const cartsModel = mongoose.model(collection,productsSchema)

module.exports = {
    cartsModel
}