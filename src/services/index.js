const CartDaoMongo = require("../dao/managers/cartDaoMongoose");
const ContactDaoMongo = require("../dao/managers/contactDaoMongoose");
const ProductDaoMongo = require("../dao/managers/productDaoMongoose");
const CartsRepository = require("../dao/repositories/cartsRepository");
const ContactsRepository = require("../dao/repositories/contacts.repository");



const productService = new ProductDaoMongo ()
const cartService = new CartsRepository( new CartDaoMongo ())
const contactService = new ContactsRepository (new ContactDaoMongo ())


module.exports = {
    productService,
    cartService,
    contactService
}