const mongoose = require ("mongoose")
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
            console.log("Base de datos ya esta creada")
            return this.#instance
        }
        this.#instance = new MongoSingleton()
        console.log("base de dato conectada")
        return this.#instance
    }
}

module.exports = {
    MongoSingleton
}