
const { contactService } = require("../services");

class ContactController{

    getContact = async(req,res)=>{
        try {
            let contacts = contactService.getContact()
            res.send(contacts)
        } catch (error) {
            res.status(400).send(error)
        }
    }

    postContact=async(req,res)=>{
        try {
           const {name,last_name,phone}= req.body
           contactService.createContact({name,last_name,phone})
           res.send("hola")


        } catch (error) {
            res.status(400).send(error)
        }
    }
}


module.exports = new ContactController()
