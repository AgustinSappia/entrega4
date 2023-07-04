const {contactModel} = require("../models/contacts.model")

class ContactDaoMongo{

    getContact = async()=>{
        try{
            let contacts = await contactModel.find()
            return await contacts
        }
        catch(error){
            return error
        }
    }

    createContact = async(newContact)=>{
        await contactModel.create(newContact)
    }


}



module.exports = ContactDaoMongo 