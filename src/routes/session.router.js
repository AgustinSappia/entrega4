const {Router} = require("express")
const { userModel } = require("../dao/models/user.model")
const { auth } = require("../dao/middlewares/autentication")
const session = require("express-session")
const { createHash, isValidPassword } = require("../utils/bcryptHash")
const passport = require("passport")
const { generateToken } = require("../utils/jwt")
const { passportCall } = require("../passport-jwt/passportCall")
const { authorization } = require("../passport-jwt/authorizationJwtRole")
const router = Router()

const CartDaoMongo = require("../dao/managers/cartDaoMongoose")
const userDto = require("../dto/user.dto")
const sessionController = require("../controllers/session.controller")
const cartManager = new CartDaoMongo()



router.get("/",passportCall("jwt"),authorization(["admin"]),sessionController.getSession)


//LOGIN


//login 1 es ingreso de datos mediante query.params
// router.get("/login1",async(req,res)=>{
//     try{
//         const{username,password} = req.query
//         if(username!== "pepe"||password!=="pepepass"){
//             return res.send("login failed")
//         }
//         req.session.user= username
//         req.session.admin = true
//         res.send("login success")
//     }
//     catch (error){
//             res.send(error)
//     }
// })


//loginCookies es ingreso mediante un post realizado por un formulario e la implementacion de cookies

// router.get("/loginCookies",async(req,res)=>{
//     try{
//         console.log("hola")
//         let token = generateToken({nombre:"raul"})
//         console.log(token)
//         res.render("loginCookies",{})
//     }
//     catch (error){
//         res.send(error)
//     }


// })
// router.post("/loginCookies",async(req,res)=>{
//     try{
//         const{username,email}=req.body
//         res.cookie(username,email,{maxAge:1000000,signed:true}).send({mensaje:"seteado"})
//     }
//     catch(error){
//         res.send(error)
//     }
// })

//login mediante DB y bcrypt





router.post("/login3",sessionController.login3)

// //login con passport 
// router.post("/login4",passport.authenticate("login", {failureRedirect:"/api/session/faillogin",succesRedirect:"/api/products"}), async(req,res)=>{

//     if(!req.user) return res.status(401).send({status:"error", error:"invalid credencial"})
//     req.session.user ={
//         first_name: req.user.first_name,
//         last_name: req.user.last_name,
//         email: req.user.email,
//         rol: req.user.rol
//     }
    
//     res.redirect("/api/products")
// })

// router.get("/faillogin",async(req,res)=>{
//     console.log("fallo la estrategia")
//     res.send({estatus:"error",error:"fallo la autenticacion"})
// })

//github

// router.get("/github",passport.authenticate("github", {scope: ["user:email"]}))
// router.get("/githubcallback",passport.authenticate("github",{failureRedirect:"/login"}), async(req,res)=>{
//     req.session.user = req.user
//     res.redirect("/api/products")
// })




router.post("/register",sessionController.register)

// router.post("/register",passport.authenticate("register",{
//     failureRedirect: "api/session/failregister",
//     successRedirect:"/login",
//         }
//     ),async(req,res)=>{
//         console.log("registro exitoso")
//         res.redirect("login")
//     }
// )

// router.get("/failregister",async(req,res)=>{
//     console.log("fallo la estrategia")
//     res.send({estatus:"error",error:"fallo la autenticacion"})
// })



//LOGOUT
router.post("/recuperarpass",sessionController.enviarMail)
router.post("/cambiarpass",sessionController.cambiarPass)

router.get("/logout",passportCall("jwt"),sessionController.logout)

router.get("/current", passportCall("jwt"),authorization(["admin"]) , sessionController.current)



module.exports = router