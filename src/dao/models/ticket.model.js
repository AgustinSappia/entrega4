const mongoose = require("mongoose")


const collection= "ticket"

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        // unique: true,
        required: true
    },
    pucharse_datetime:{
        type:Date,
        required:true,
        default:Date.now
    },
    amount:{
        type:Number,
        required:true
    },
    purcharser:{
        type: String,
        required: true
    }
})

const ticketModel = mongoose.model(collection,ticketSchema)


module.exports = {
    ticketModel
}