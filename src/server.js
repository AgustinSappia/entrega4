
let express = require("express")


let routerProducts = require("./routes/products.router")
let routerCart = require("./routes/cart.router")
let pruebasRouter = require("./routes/pruebas.router")
const {Server}= require("socket.io")
let app = express()
let puerto = 8080

const httpServer = app.listen(puerto,()=>{
    
    console.log("escuchando: "+ puerto)
})

const socketServer = new Server(httpServer)




//hbs------------------------
const handlebars= require("express-handlebars");
const { socketProduct } = require("./public/script/socketProducts")
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname+"/views")
app.set("view engine", "handlebars")
//hbs------------------------

app.use(express.json()) //body-parser implementa una libreria nativa que antes era externa
app.use(express.urlencoded({extended: true})) //permite recibir url complejas en express
app.use(express.static(__dirname+"/public"))

//GET



app.get("/",async(request,response)=>{
    try{
        response.send("buenas")
    }
    catch(error){
        console.log(error)
    }
})

socketServer.on("connection", socket =>{
    console.log("nuevo usuario conectado")
})
socketProduct(socketServer)

app.use("/products",routerProducts)
app.use("/cart",routerCart)
app.use("/test",pruebasRouter)      //router para hacer diferentes pruebas





