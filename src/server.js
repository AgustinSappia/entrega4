
let express = require("express")


let routerProducts = require("./routes/products.router")
let routerCart = require("./routes/cart.router")
let pruebasRouter = require("./routes/pruebas.router")
const {Server}= require("socket.io")
let app = express()
let puerto = 8080

const httpServer = app.listen(puerto,()=>{
    
    console.log(`escuchando puerto: ${puerto}`)
})

const socketServer = new Server(httpServer)

//mongoo prueba
const objetConfigs = require("./config/objetConfigs")
objetConfigs.connectDb()
const {userModel} = require("./dao/models/user.model")


//hbs------------------------
const handlebars= require("express-handlebars");
const { socketProduct } = require("./public/script/socketProducts")
const { chatSocket } = require("./public/script/chatSocket")
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname+"/views")
app.set("view engine", "handlebars")
//hbs------------------------

app.use(express.json()) //body-parser implementa una libreria nativa que antes era externa
app.use(express.urlencoded({extended: true})) //permite recibir url complejas en express
app.use(express.static(__dirname+"/public"))

//GET



app.get("/hola",async(request,response)=>{
    try{
        response.send("buenas")
        let usuarios = await userModel.find()//prueba de mongoo 
        console.log(usuarios)   //prueba de mongoo 
    }
    catch(error){
        console.log(error)
    }
})

app.post("/hola" ,async(req,res)=>{
try{
let user= req.body
const newUser ={
    first_name: user.name,
    last_name: user.lastName,
    email: user.email
}
let result = await userModel.create(newUser)

}
catch(error){
    console.log(error)
}
})

socketServer.on("connection", socket =>{
    console.log("nuevo usuario conectado")
})
socketProduct(socketServer)
chatSocket(socketServer)

app.use("/products",routerProducts)
app.use("/cart",routerCart)
app.use("/test",pruebasRouter)      //router para hacer diferentes pruebas





