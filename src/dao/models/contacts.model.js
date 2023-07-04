const mongoose = require("mongoose")
const collection = "contacts"

const contactsSchema =new mongoose.Schema({
    first_name :{
        type:String,
        require:true
    },
    last_name:{
        type:String,
        require: true
    },
    active: Boolean,
    phone: String
})

let contactModel = mongoose.model(collection, contactsSchema)

module.exports= {
    contactModel
}
