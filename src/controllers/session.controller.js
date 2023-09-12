

const { userModel } = require("../dao/models/user.model")


const { createHash, isValidPassword } = require("../utils/bcryptHash")

const { generateToken,generateShortToken, simpleAuth } = require("../utils/jwt")



const CartDaoMongo = require("../dao/managers/cartDaoMongoose")
const { CustomError } = require("../utils/CustomError/customError")
const { generateUserErrorInfo } = require("../utils/CustomError/info")
const { EError } = require("../utils/CustomError/EErrors")
const { search } = require("../routes/views.router")
const {sendMail} = require("../utils/sendMail")
const { logger } = require("../config/logger")


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
                cart:search.cart,
                lastConection: new Date()
            }    
            let token = generateToken(user)
            await userModel.updateOne({email:email},{lastConection: new Date()})  //hacemos el update para que se guarde la last connection
               
                res.cookie("tokenCookie",token,{
                    maxAge: 60*60*10000,
                    httpOnly:true
                }).redirect("/api/products")
    
                
        
        }
        catch(error){
            res.send(error)
        }
    } 

    register = async(req,res,next)=>{
        try{
            const{first_name,last_name,email,password,age} = req.body  
            if(!first_name || !last_name || !email || !password || !age){
                CustomError.createError({
                    name:"User creation error",
                    cause: generateUserErrorInfo({
                        first_name,
                        last_name,
                        email
                    }),
                    message: "Error trying to create user",
                    code:EError.INVALID_TYPE_ERROR
                })
                res.status(400).send({status:"error",error:"no ingreso todos los datos"})
            }
            const existUser = await userModel.findOne({email})
            if(existUser) return res.send({status:"error", error:"el mail ya esta registrado"})
            let cart = await cartManager.createCart()
            const newUser={
                first_name,
                last_name,
                email,
                password: createHash(password),
                age,
                cart: cart._id,
                rol:"user",
                lastConection: "",
                documents: []
            }
            
    
            req.logger.info(newUser)
            

            let resultUser = await userModel.create(newUser)
            
            if (first_name =="pruebaSuper") {
                res.status(200).send(newUser)
            }
            else{
                res.status(200).redirect("/login")
            }

    
    
        }
        catch(error){
            next(error)
        }
    }


    enviarMail = async(req,res,next)=>{

        try {
            let mail = req.body
            let search = await userModel.findOne(mail)
    
            if(!search){
                res.send("el mail no existe")
            }
            else{
                let token = await generateShortToken(mail)
                sendMail(mail.email,"recuperar cuenta",`
                <div>
                    <h1>hola</h1>
                    <p>si deseas cambiar el pass </p><a href="http://localhost:8080/cambiarPass/${token}">ingresa aqui</a>
                </div>
                `)
    
               
                res.cookie("shortTokenCookie",token,{
                    maxAge: 60*60*100,
                    httpOnly:true
                }).send("mail enviado")

            }
            
        } catch (error) {
            next(error)
        }



    }

    cambiarPass = async (req,res,next)=>{
        try {

            let info = req.body
            let pass=req.body.pass1
            let auth =simpleAuth(info.token)
           if( !auth){
                res.send({error:"expirado"})
           }
           let email = auth.user.email
           let user = await userModel.findOne({email:email})
           if(isValidPassword(user,pass)){
                res.send({error:"same password"})
           }
           else{
               let result = await userModel.findOneAndUpdate({email:email},{password:createHash(pass)})
                res.send({resultado:result, message:"pass cambiada con exito"})

           }                
        } catch (error) {
          logger.error(error)
        }
    }


    logout = async(req,res)=>{
        try{

            let usuario = req.user
            await userModel.updateOne({email:usuario.email},{lastConection:new Date()})
            logger.info("usuario Desconectado")
            res.clearCookie("tokenCookie").redirect("/")
    
    
    
        }
        catch(error){
            logger.error(error)
            res.send(error)
        }
    }


    current = async(req,res)=>{
        res.send(req.user)
    }






}




module.exports = new SessionController ()