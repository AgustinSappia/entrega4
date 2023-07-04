

const { userModel } = require("../dao/models/user.model")


const { createHash, isValidPassword } = require("../utils/bcryptHash")

const { generateToken } = require("../utils/jwt")



const CartDaoMongo = require("../dao/managers/cartDaoMongoose")


const cartManager = new CartDaoMongo()





class SessionController{



  getSession =  async(req,res)=>{
        try{
            res.send(req.user)
        }
        catch(error){
            res.send(error)
        }
    }


    login3 = async(req,res)=>{
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
    } 

    register = async(req,res)=>{
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
    }


    logout = async(req,res)=>{
        try{
    
            res.clearCookie("tokenCookie")
    
            res.redirect("/")
    
    
        }
        catch(error){
     
            res.send(error)
        }
    }


    current = async(req,res)=>{
        res.send(req.user)
    }






}




module.exports = new SessionController ()