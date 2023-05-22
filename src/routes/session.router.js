const {Router} = require("express")
const { userModel } = require("../dao/models/user.model")
const { auth } = require("../dao/middlewares/autentication")
const session = require("express-session")
const router = Router()


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
router.get("/login1",async(req,res)=>{
    try{
        const{username,password} = req.query
        if(username!== "pepe"||password!=="pepepass"){
            return res.send("login failed")
        }
        req.session.user= username
        req.session.admin = true
        res.send("login success")
    }
    catch (error){
            res.send(error)
    }
})


//login2 es ingreso mediante un post realizado por un formulario e la implementacion de cookies

router.get("/login2",async(req,res)=>{
    try{
    res.render("login2",{})
    }
    catch (error){
        res.send(error)
    }


})
router.post("/login2",async(req,res)=>{
    try{
        const{username,email}=req.body
        res.cookie(username,email,{maxAge:1000000,signed:true}).send({mensaje:"seteado"})
    }
    catch(error){
        res.send(error)
    }
})

//login 3 


router.get("/login3",async(req,res)=>{
    try{
    res.render("login3",{})
    }
    catch (error){
        res.send(error)
    }


})
router.post("/login3",async(req,res)=>{
    try{
        const{email,password}=req.body

        if(!email||!password) return res.send({status:"error",error:"hay campos faltantes"})
        const search = await userModel.findOne({email,password})

        if (!search) return res.send({status:"error",error:"el usuario o la contraseña es incorrecta"})
        
        req.session.user ={
            first_name: search.first_name,
            last_name: search.last_name,
            username: search.username,
            email: search.email,
            rol: search.rol
        }
        res.redirect("/products")

        
    }
    catch(error){
        res.send(error)
    }
})




// REGISTER

router.get("/register",async(req,res)=>{
    try{
    res.render("register",{})
    }
    catch (error){
        res.send(error)
    }


})


router.post("/register",async(req,res)=>{
    try{
        const{username,first_name,last_name,email,password} = req.body
        if(!username || !first_name || !last_name || !email || !password){
            res.status(400).send({status:"error",error:"no ingreso todos los datos"})
        }
        const existUser = await userModel.findOne({email})
        console.log(existUser)
        if(existUser) return res.send({status:"error", error:"el email ya existe"})

        const newUser={
            username,
            first_name,
            last_name,
            email,
            password,
            rol:"user"
        }

        let resultUser = await userModel.create(newUser)

        res.status(200).redirect("/session/login3")


    }
    catch(err){
        console.log(err)
    }
})




//LOGOUT

router.get("/logout",async(req,res)=>{
    try{
        req.session.destroy(err=>{
            if(!err) res.redirect("/session/login3")
            else res.send({status:"logout Error", body:err})
        })

    }
    catch(error){
        res.send(error)
    }
})



module.exports = router