/// esquema

const mongoose = require("mongoose");

const collection = "users"

const userSchema = new mongoose.Schema({

        username: {
            type: String,
            required:true,
            unique:true
        },
        
        first_name: {
            type: String,
            required:true
        },

        last_name:{
            type: String,
            required: true
        },
        email:{
            type:String,
            required: true,
            unique: true
        },
        password: String,
        rol: String
    })

    const userModel = mongoose.model(collection,userSchema)

    module.exports ={
        userModel
    }