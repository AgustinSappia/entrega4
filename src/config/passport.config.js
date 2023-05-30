const passport = require ("passport")
const local = require("passport-local")
const { userModel } = require("../dao/models/user.model")
const { createHash, isValidPassword } = require("../utils/bcryptHash")
const githubStrategy= require("passport-github2")
require("dotenv").config()


const LocalStrategy = local.Strategy

const initPassport = () =>{
    //vamos a configurar el registro
    passport.use("register", new LocalStrategy({
        passReqToCallback: true,     //acceso a la request
        usernameField: "email"      // es para que tome el valor de email como campo del username
    }, async(req, username ,password ,done)=>{
        const {first_name,last_name} = req.body
        const usernombre = req.body.username
        
        try{
            let userDB =await userModel.findOne({email: username})   // el username es el email disfrazado
            if (userDB) return done(null,false)
            
            
            let newUser ={
                first_name,
                last_name,
                email: username,
                password: createHash(password),
                username: usernombre,
                rol:"user"
            }
            let result = await userModel.create(newUser)
            return done(null, result)
        }
        catch(err){
            return done("error al obtener el usuario "+err)
        }
       }))

       passport.serializeUser((user,done)=>{
           done(null, user._id)
       })
       passport.deserializeUser(async(id,done)=>{
           let user = await userModel.findOne({_id:id})
           done(null,user)
       })
}



passport.use("login", new LocalStrategy({
    usernameField: "email"
}, async(username,password,done)=>{
    try{
    
        const userDB = await userModel.findOne({email:username})
        if (!userDB) return done(null,false)
        if(!isValidPassword(userDB,password)) return done(null,false)
        return done(null,userDB)
    }
    catch(error){
        console.log("error en el strategy login")
    }
}

))

const initPassportGithub = ()=>{
    passport.use("github", new githubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret:process.env.GITHUB_CLIENT_SECRET,
        callbackURL:process.env.GITHUB_CALLBACK_URL
    }, async(accessToken, refreshToken, profile, done)=>{
        // console.log("profile", profile)
        try{
            let user = await userModel.findOne({email:profile._json.email})
            if(!user){
                let newUser={
                    username:profile.username,
                    first_name: profile.username,
                    last_name: profile.username,
                    email: profile._json.email,
                    rol:"user",
                    password:""
                }
                let result = await userModel.create(newUser)
                return done(null,result)
            }
            return done(null,user)
        }
        catch(error){
            console.log(error)
        }

    }))
    passport.serializeUser((user,done)=>{
           done(null, user._id)
       })
       passport.deserializeUser(async(id,done)=>{
           let user = await userModel.findOne({_id:id})
           done(null,user)
       })
}


module.exports = {initPassport, initPassportGithub}
