const { ContactDto } = require("../../dto/contact.dto");

class ContactsRepository{
    constructor(dao){
        this.dao = dao
    }

    getContacts = async ()=>{
        let result = await this.dao.getContact()
        return await result
    }

    createContact = async (newContact)=>{
        let contactToInsert = new ContactDto (newContact)
        let result = await this.dao.createContact(contactToInsert)
        return await result
    }

}

module.exports = ContactsRepository