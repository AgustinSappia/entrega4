const {Router} = require("express")
const router = Router()


router.get("/",async(req,res)=>{
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


router.get("/login2",async(req,res)=>{
    try{
    res.render("login2",{})
    }
    catch (error){
        res.send(error)
    }


router.post("/login2",async(req,res)=>{
    try{
        const{username,email}=req.body
        res.cookie(username,email,{maxAge:1000000,signed:true}).send({mensaje:"seteado"})
    }
    catch(error){
        res.send(error)
    }
})
    })



router.get("/logout",async(req,res)=>{
    try{
        req.session.destroy(err=>{
            if(!err) res.send("logout Ok")
            else res.send({status:"logout Error", body:err})
        })

    }
    catch(error){
        res.send(error)
    }
})



module.exports = router