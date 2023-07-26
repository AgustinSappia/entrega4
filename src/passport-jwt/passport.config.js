const passport = require ("passport")
const jwt = require ("passport-jwt")
const objetConfigs= require("../config/objetConfigs")


const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const cookieExtractor = req =>{
    let token = null
    if(req && req.cookies){
        token = req.cookies["tokenCookie"]
    }
    return token
}

const initPassport = () => {
    passport.use ("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: "palabraJwtSecreto"
    }, async (jwt_payload,done)=>{
        try{
            return done (null, jwt_payload)
        }
        catch(err){
            return done(err)
        }
    }))
}

module.exports = {
    initPassport
}