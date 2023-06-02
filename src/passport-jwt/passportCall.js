const passport = require("passport")

const passportCall = strategy=>{
    return async(req,res,next)=>{
        passport.authenticate(strategy,{session:false},function(err,user,info){
            if(err) return next(err)
            if(!user) return res.status(401).send({status:"error", error:info.messages? info.messages:info.toString()})
            req.user = user.user    //en user queda guardada info como exp y iat
            next()
        })(req,res,next)
    }

}
// esta funcion sirve como analisis de datos de JWTpassport, sirve para saber el error especifico esta pasando en la callback de passport, sin esto tendriamos que estar prueba y error cada vez que nos surja un problema con la autenticacion de passport
// recibe el nombre de la estrategia 
module.exports={
    passportCall
}

