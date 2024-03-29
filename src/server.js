
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
const userRouter = require("./routes/user.router")
const loggerTestRouter = require("./routes/loggerTest")
const usersRouter= new UserRouter()
//_________________________________________________________________________________
const {Server: serverHTTP} = require("http") 
const {Server: ServerIO}= require("socket.io")
const cookieParser = require("cookie-parser")
const MongoStore = require("connect-mongo")
let app = express()
const serverHttp = serverHTTP(app)
const socketServer = new ServerIO(serverHttp)

//cors
const cors = require("cors")
//swagger 

const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUiExpress= require("swagger-ui-express")


//mongoo prueba
const objetConfigs = require("./config/objetConfigs")
objetConfigs.connectDb()
let puerto = process.env.PORT

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
app.use(cors())
//passport
// const { initPassport, initPassportGithub } = require("./config/passport.config")
const passport = require("passport")
const { initPassport } = require("./passport-jwt/passport.config")
const { authorization } = require("./passport-jwt/authorizationJwtRole")
const { passportCall } = require("./passport-jwt/passportCall")
const { errorHandler } = require("./dao/middlewares/error.middlewares")
const { addLogger, logger } = require("./config/logger")

//

app.use(addLogger)

//manejo de errores
//cors
// const cors= require("cors")
// app.use(cors())




//_________________________________________________________________________________________


//puerto
//const socketServer = new Server(httpServer)

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
        logger.error(error)
    }
})




app.get("/cookie", async(req,res)=>{
    
    res.cookie("CookieHacker","Ten mucho cuidado forastero",{maxAge:10000,signed:true}).send({msj:"Probamos cookies",cookieCreada:await req.cookies})
    
})


//swagger config
const swaggerOptions = {
    definition:{
        openapi: "3.0.1",
        info:{
            title:"Bienvenido",
            description:"esta es una interfaz de prueba en la cual estoy intentando implementar swagger al proyecto, las peticiones funcionan pero por el momento no es posible autenticar cada una de ellas"
        }
    },
   
    apis: [`${__dirname}/docs/**/*.yaml`]
}
const specs= swaggerJsDoc(swaggerOptions)
app.use("/docs",swaggerUiExpress.serve, swaggerUiExpress.setup(specs))





socketServer.on("connection", socket =>{
    logger.info("nuevo usuario conectado")
})
socketProduct(socketServer)
chatSocket(socketServer)

app.use("/api/products",routerProducts)
app.use("/api/cart",routerCart)
app.use("/api/message",socketRouter)      
app.use("/api/session",sessionRouter)
app.use("/",viewsRouter)
//app.use("/api/user",usersRouter.getRouter())
app.use("/api/user",userRouter)
app.use("/contact",contacRouter)
app.use("/pruebas",pruebasRouter)
app.use("/mockingProducts",mockRouter)
app.use("/loggerTest",loggerTestRouter)







app.use(errorHandler)

serverHttp.listen(puerto,()=>{
    logger.info(`escuchando puerto: ${puerto}`)
})




