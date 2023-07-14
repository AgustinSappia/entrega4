const mongoose= require ("mongoose")
const { MongoSingleton } = require("../utils/singleton")
const { commander } = require('../utils/commander')
const dotenv = require('dotenv')

require("dotenv").config()

const url = process.env.MONGO_URL

const { mode } = commander.opts()
dotenv.config({
    path: mode === 'development' ? './.env.development': './.env.production' 
})









module.exports ={
    port:process.env.PORT,
    jwt_secret_key: process.env.JWT_SECRET_KEY,
    // connectDb: ()=>{
    //     mongoose.connect(url)
    //     console.log("base de datos conectada")
    // }
    connectDb : async()=> await MongoSingleton.getInstance()
}