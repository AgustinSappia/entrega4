const mongoose = require("mongoose");

const collection = "carts"

const productsSchema= new mongoose.Schema({

    products: [{
        _id: String,
        cantidad:Number
    }]

})

const cartsModel = mongoose.model(collection,productsSchema)

module.exports = {
    cartsModel
}