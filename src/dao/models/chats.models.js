const mongoose = require("mongoose");

const collection = "chats"

const chatsSchema= new mongoose.Schema({

   user:String,
   message:String

})

const chatsModel = mongoose.model(collection,chatsSchema)

module.exports = {
    chatsModel
}