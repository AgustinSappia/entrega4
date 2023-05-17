
const express = require("express")
const session =require("express-session")

const routerProducts = require("./routes/products.router")
const routerCart = require("./routes/cart.router")
const pruebasRouter = require("./routes/pruebas.router")
const sessionRouter = require("./routes/session.router")
const {Server}= require("socket.io")
const cookieParser = require("cookie-parser")
const MongoStore = require("connect-mongo")
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
const filestore = require("session-file-store")
const filestorage = filestore(session)
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname+"/views")
app.set("view engine", "handlebars")
//hbs------------------------

app.use(express.json()) //body-parser implementa una libreria nativa que antes era externa
app.use(express.urlencoded({extended: true})) //permite recibir url complejas en express
app.use(express.static(__dirname+"/public"))
app.use(cookieParser("CoderS3cR3tC0D3"))

app.use(session({
    store:MongoStore.create({
        mongoUrl:"mongodb+srv://agustinsappia12:Dni42206141@cluster0.uvoardd.mongodb.net/?retryWrites=true&w=majority",
        mongoOptions:{useNewUrlParser:true, useUnifiedTopology:true},
        ttl:15
    }),
    secret:"SsEeCcRrEeTtCcOoDdEe",
    resave:false,
    saveUninitialized:false
}))
//GET








app.get("/cookie", async(req,res)=>{

    res.cookie("CookieHacker","Ten mucho cuidado forastero",{maxAge:10000,signed:true}).send({msj:"Probamos cookies",cookieCreada:await req.cookies})

})




socketServer.on("connection", socket =>{
    console.log("nuevo usuario conectado")
})
socketProduct(socketServer)
chatSocket(socketServer)

app.use("/products",routerProducts)
app.use("/cart",routerCart)
app.use("/test",pruebasRouter)      //router para hacer diferentes pruebas
app.use("/session",sessionRouter)





