const {Router} = require ("express")
const jwt = require("jsonwebtoken")

class RouterClass{

    constructor(){
        this.router = Router()
        this.init()
    }

    getRouter(){
        return this.router
    }

    init(){}

    applyCallbacks(callbacks){
        return callbacks.map(callback => async(...params)=>{
                try {
                    await callback.apply(this, params)
                } catch (error) {
                    console.log(error)
                    params[1].status(500).send(error)
                }
        })
    }


    generateCustomsResponse = (req,res,next)=>{
        res.sendSuccess= payload => res.send ({status:"success", payload})
        res.sendServerError= error => res.send ({status:"error", error})
        res.sendUserError= error => res.send ({status:"error", error})
        next()
    }

    handlePoliticies = policies => (req,res,next)=>{
        if(policies[0]==="PUBLIC") return next()
        const authHeader = req.headers.authorization
        if (!authHeader) res.send({status:error, error:"no autorizado"})
        const token = authHeader.split("")[1]
        const user = jwt.verify(token,"CoderSecreto")
        if(!policies.includes(user.role.toUpperCase())) res.status(403).send({status:error, error:"no tiene permisos"})
        req.user= user
        next()
            
        
    }


    get(path, policies,...callbacks){
        this.router.get(path,this.handlePoliticies(policies),this.generateCustomsResponse ,this.applyCallbacks(callbacks))
    }
    post(path, policies,...callbacks){
        this.router.get(path,this.handlePoliticies(policies),this.generateCustomsResponse ,this.applyCallbacks(callbacks))
    }
    put(path, policies,...callbacks){
        this.router.get(path,this.handlePoliticies(policies),this.generateCustomsResponse ,this.applyCallbacks(callbacks))
    }
    delete(path, policies,...callbacks){
        this.router.get(path,this.handlePoliticies(policies),this.generateCustomsResponse ,this.applyCallbacks(callbacks))
    }

    // post(){}

    // put(){}

    // delete(){}

}



module.exports = { RouterClass}