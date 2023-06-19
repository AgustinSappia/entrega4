const mongoose= require ("mongoose")
const { MongoSingleton } = require("../utils/singleton")

require("dotenv").config()

const url = process.env.MONGO_URL


module.exports ={
    jwt_secret_key: process.env.JWT_SECRET_KEY,
    // connectDb: ()=>{
    //     mongoose.connect(url)
    //     console.log("base de datos conectada")
    // }
    connectDb : async()=> await MongoSingleton.getInstance()
}