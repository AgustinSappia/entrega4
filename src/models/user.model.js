/// esquema

const mongoose = require("mongoose");

const collection = "users"

const userSchema = new mongoose.Schema({
        first_name: String,
        last_name:{
            type: String,
            required: true
        },
        email:{
            type:String,
            required: true,
            unique: true
        }
    })

    const userModel = mongoose.model(collection,userSchema)

    module.exports ={
        userModel
    }