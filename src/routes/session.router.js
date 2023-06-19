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

const CartManagerMongo = require("../dao/managers/cartManagerMongoose")
const cartManager = new CartManagerMongo()



router.get("/",auth,async(req,res)=>{
    try{
        if(req.session.counter){
            req.session.counter++
            res.send(`se ha visitado el sitio ${req.session.counter} veces. `)
        }
        else{
            req.session.counter = 1 
            res.send("bienvenido por primera vez")
        }
    }
    catch(error){
        res.send(error)
    }
})


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





router.post("/login3",async(req,res)=>{
    try{
        const{email,password}=req.body
        if(!email||!password) return res.send({status:"error",error:"hay campos faltantes"})
        const search = await userModel.findOne({email})
        
        if (!search) return res.send({status:"error",error:"el usuario o la contraseña es incorrecta"})
        // //validar passwrord
        if(!isValidPassword(search,password)) return res.status(403).send({status:"error", message:"el usuario o la contraseña es incorrecta"})
        
        let user ={
            first_name: search.first_name,
            last_name: search.last_name,
            email: search.email,
            rol: search.rol,
            age:search.age,
            cart:search.cart
        }    
        let token = generateToken(user)

           
            res.cookie("tokenCookie",token,{
                maxAge: 60*60*10000,
                httpOnly:true
            }).redirect("/api/products")

            
    
    }
    catch(error){
        res.send(error)
    }
})

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




router.post("/register",async(req,res)=>{
    try{
        const{first_name,last_name,email,password,age} = req.body
        if(!first_name || !last_name || !email || !password || !age){
            res.status(400).send({status:"error",error:"no ingreso todos los datos"})
        }
        const existUser = await userModel.findOne({email})
        if(existUser) return res.send({status:"error", error:"el mail ya esta registrado"})
        let cart = await cartManager.createCart()
        const newUser={
            username:"pepe",
            first_name,
            last_name,
            email,
            password: createHash(password),
            age,
            cart: cart._id,
            rol:"user"
        }
        

        console.log(newUser)
        
        let resultUser = await userModel.create(newUser)



        res.status(200).redirect("/login")


    }
    catch(err){
        console.log(err)
    }
})

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

router.get("/logout",passportCall("jwt"),async(req,res)=>{
    try{

        res.clearCookie("tokenCookie")

        res.redirect("/")


    }
    catch(error){
 
        res.send(error)
    }
})

router.get("/current", passportCall("jwt"),authorization("admin") , async(req,res)=>{
    res.send(req.user)
})



module.exports = router