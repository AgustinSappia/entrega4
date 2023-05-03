const mongoose = require("mongoose");

const collection = "products"

const productsSchema= new mongoose.Schema({

    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: String,
    stock: Number,
})

const productsModel = mongoose.model(collection,productsSchema)

module.exports = {
    productsModel
}