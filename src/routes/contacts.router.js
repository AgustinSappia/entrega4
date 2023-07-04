const {Router} = require("express") 


const router = Router()
const {getContact,postContact} = require("../controllers/contacts.controller")

router.get("/",getContact)

router.post("/",postContact)

module.exports = router