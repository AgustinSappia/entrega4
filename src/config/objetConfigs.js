const mongoose= require ("mongoose")

let url="mongodb+srv://agustinsappia12:Dni42206141@cluster0.uvoardd.mongodb.net/?retryWrites=true&w=majority"

module.exports ={
    jwt_secret_key: "palabraJwtSecreto",
    connectDb: ()=>{
        mongoose.connect(url)
        console.log("base de datos conectada")
    }
}