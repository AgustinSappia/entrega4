const CartManagerMongo = require("../dao/managers/cartManagerMongoose");
const ProductManagerMongo = require("../dao/managers/productManagerMongoose");

const productService = new ProductManagerMongo ()
const cartService = new CartManagerMongo ()


module.exports = {
    productService,
    cartService
}