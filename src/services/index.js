const CartDaoMongo = require("../dao/managers/cartDaoMongoose");
const ContactDaoMongo = require("../dao/managers/contactDaoMongoose");
const ProductDaoMongo = require("../dao/managers/productDaoMongoose");
const UserDaoMongo = require("../dao/managers/userDaoMongoose");
const CartsRepository = require("../dao/repositories/cartsRepository");
const ContactsRepository = require("../dao/repositories/contacts.repository");



const productService = new ProductDaoMongo ()
const cartService = new CartsRepository( new CartDaoMongo ())
const contactService = new ContactsRepository (new ContactDaoMongo ())
const userService = new UserDaoMongo()


module.exports = {
    productService,
    cartService,
    contactService,
    userService
}