const { RouterClass } = require("./RouterClass");

class UserRouter extends RouterClass{
    init(){
        this.get("/",async(req,res)=>{
            try {
                res.sendSuccess("hola coder")
                
            } catch (error) {
                res.sendServerError(error)
            }
        })
        this.get("/current",["ADMIN"],async(req,res)=>{
            try {
                res.sendSuccess("validar")
                
            } catch (error) {
                res.sendServerError(error)
            }
        })

        this.get("/premium/:uid", async(req,res)=>{
            try {
            let {uid} = req.params
           res.render("premium",{uid})
            } catch (error) {
                console.log(error)
            }
          
        })
    }
}

module.exports=UserRouter