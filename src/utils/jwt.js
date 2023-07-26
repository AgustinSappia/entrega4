const jwt = require("jsonwebtoken")
const JWT_PRIVATE_KEY = "palabraJwtSecreto"


const generateToken= (user)=>{
    const token = jwt.sign({user}, JWT_PRIVATE_KEY, {expiresIn:"24h"})
    return token
}
const generateShortToken= (user)=>{
    const token = jwt.sign({user}, JWT_PRIVATE_KEY, {expiresIn:"1h"})
    return token
}

const authToken = (req,res,next)=>{
    const authHeader = req.headers["authorization"]

    if (!authHeader){
        return res.status(401).send({status: "error", error:"no autenticado"})
    }

    const token = authHeader.split(" ")[1]

    jwt.verify(token, JWT_PRIVATE_KEY,(error,credential)=>{
        if(error) return res.status(403).send({status:"error", error:"no autorizado"})

        req.user = credential.user
        next()
    })
}

const simpleAuth = (token)=>{
   return jwt.verify(token, JWT_PRIVATE_KEY,(error,credential)=>{
        if(error) return res.status(403).send({status:"error", error:"no autorizado"})
        return credential
    })
    
}



module.exports = {
    generateToken,
    authToken,
    generateShortToken,
    simpleAuth
}

