const {Router}=require("express")
const { generateXProducts } = require("../utils/generateUserFaker")
const router = Router()


router.get("/", async(req,res)=>{

    let products = generateXProducts(100)

    res.render("mockProducts",{products})


})



module.exports = router