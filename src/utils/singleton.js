const mongoose = require ("mongoose")
const { logger } = require("../config/logger")
require("dotenv").config()

const url = process.env.MONGO_URL
class MongoSingleton{

    static #instance
    constructor(){
        mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

    }
    static getInstance(){
        if(this.#instance){
            logger.info("Base de datos ya esta creada")
            return this.#instance
        }
        this.#instance = new MongoSingleton()
        logger.info("base de dato conectada")
        return this.#instance
    }
}

module.exports = {
    MongoSingleton
}