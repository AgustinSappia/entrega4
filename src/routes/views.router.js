const {Router} = require("express")
const CartDaoMongo = require("../dao/managers/cartDaoMongoose")
const cartManager = new CartDaoMongo()
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

//RECUPERAR PASS

router.get("/recuperarpass",async(req,res)=>{
    try{
    res.render("recuperarpass",{})
    }
    catch (error){
        res.send(error)
    }


})

router.get("/cambiarPass/:token",async(req,res)=>{
    try{
        const {token}=req.params 
    res.render("cambiarPass",{token})
    }
    catch (error){
        res.send(error)
    }


})

router.get("/crearproducto",async(req,res)=>{
    try{
    res.render("crearProducto")
    }
    catch (error){
        res.send(error)
    }


})


module.exports=router
