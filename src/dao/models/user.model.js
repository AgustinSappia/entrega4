/// esquema

const mongoose = require("mongoose");

const collection = "users"

const userSchema = new mongoose.Schema({

        
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
        age: Number,
        password: String,
        cart:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "carts",
        },
        rol: String,
        lastConection:{type:String,required:false},
        documents:[{
            name:String,
            reference:String
        }]
    
    })

    const userModel = mongoose.model(collection,userSchema)

    module.exports ={
        userModel
    }