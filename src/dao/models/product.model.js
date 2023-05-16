const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2")
const collection = "products"

const productsSchema= new mongoose.Schema({ 

    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: String,
    stock: Number,
    status: Boolean
})

productsSchema.plugin(mongoosePaginate)     // envio paginate

const productsModel = mongoose.model(collection,productsSchema)

module.exports = {
    productsModel
}