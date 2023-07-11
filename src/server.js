
const express = require("express")
const session =require("express-session")

//.env
require("dotenv").config()

// routes
const routerProducts = require("./routes/products.router")
const routerCart = require("./routes/cart.router")
const socketRouter = require("./routes/socket.router")
const sessionRouter = require("./routes/session.router")
const viewsRouter = require("./routes/views.router")
const UserRouter = require("./routes/newUser.router")
const contacRouter = require("./routes/contacts.router")
const pruebasRouter = require("./routes/pruebas.router")
const mockRouter = require("./routes/mock.router")
const usersRouter= new UserRouter()
//_________________________________________________________________________________
const {Server}= require("socket.io")
const cookieParser = require("cookie-parser")
const MongoStore = require("connect-mongo")
let app = express()
let puerto = 8080



//mongoo prueba
const objetConfigs = require("./config/objetConfigs")
objetConfigs.connectDb()

//_________________________________________________________________________________________

//filestore
const filestore = require("session-file-store")
const filestorage = filestore(session)
//_________________________________________________________________________________________
//socket
const { socketProduct } = require("./public/script/socketProducts")
const { chatSocket } = require("./public/script/chatSocket")
//______________________________________________________________________________________
//hbs
const handlebars= require("express-handlebars");
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname+"/views")
app.set("view engine", "handlebars")
//________________________________________________________________________________________

//express
app.use(express.json()) //body-parser implementa una libreria nativa que antes era externa
app.use(express.urlencoded({extended: true})) //permite recibir url complejas en express
app.use(express.static(__dirname+"/public"))
//_________________________________________________________________________________________
//cookieParser
app.use(cookieParser(process.env.COOKIE_PARSE_CODE))
//_________________________________________________________________________________________
//passport
// const { initPassport, initPassportGithub } = require("./config/passport.config")
const passport = require("passport")
const { initPassport } = require("./passport-jwt/passport.config")
const { authorization } = require("./passport-jwt/authorizationJwtRole")
const { passportCall } = require("./passport-jwt/passportCall")
const { errorHandler } = require("./dao/middlewares/error.middlewares")


//manejo de errores
//cors
// const cors= require("cors")
// app.use(cors())




//_________________________________________________________________________________________


//puerto
const httpServer = app.listen(puerto,()=>{
    
    console.log(`escuchando puerto: ${puerto}`)
})
const socketServer = new Server(httpServer)

//_________________________________________________________________________________________



// app.use(session({
//     store:MongoStore.create({
//         mongoUrl:"mongodb+srv://agustinsappia12:Dni42206141@cluster0.uvoardd.mongodb.net/?retryWrites=true&w=majority",
//         mongoOptions:{useNewUrlParser:true, useUnifiedTopology:true},
//         ttl:300
//     }),
//     secret:"SsEeCcRrEeTtCcOoDdEe",
//     resave:false,
//     saveUninitialized:false
// }))

initPassport()
// initPassportGithub()
passport.use(passport.initialize())
// passport.use(passport.session())

//GET



app.get("/",async(req,res)=>{
    try{
        if(!req.session){
            res.redirect("/login")
        }
        else{
            res.redirect("/api/products")
        }
    }
    catch(error){
        console.log(error)
    }
})




app.get("/cookie", async(req,res)=>{

    res.cookie("CookieHacker","Ten mucho cuidado forastero",{maxAge:10000,signed:true}).send({msj:"Probamos cookies",cookieCreada:await req.cookies})

})





socketServer.on("connection", socket =>{
    console.log("nuevo usuario conectado")
})
socketProduct(socketServer)
chatSocket(socketServer)

app.use("/api/products",routerProducts)
app.use("/api/cart",routerCart)
app.use("/api/message",socketRouter)      
app.use("/api/session",sessionRouter)
app.use("/",viewsRouter)
app.use("/api/usuarios",usersRouter.getRouter())
app.use("/contact",contacRouter)
app.use("/pruebas",pruebasRouter)
app.use("/mockingProducts",mockRouter)







app.use(errorHandler)