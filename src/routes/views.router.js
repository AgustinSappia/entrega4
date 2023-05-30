const {Router} = require("express")
const CartManagerMongo = require("../dao/managers/cartManagerMongoose")
const cartManager = new CartManagerMongo()
const router = Router()




//login

router.get("/login",async(req,res)=>{
    try{
    res.render("login",{})
    }
    catch (error){
        res.send(error)
    } })


// REGISTER

router.get("/register",async(req,res)=>{
    try{
    res.render("register",{})
    }
    catch (error){
        res.send(error)
    }


})

module.exports=router
