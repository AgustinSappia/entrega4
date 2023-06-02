
console.log("conectado")
const form = document.getElementById("login2")

form.addEventListener("submit",(e)=> { 
    e.preventDefault()
    const data = new FormData(form)
    const obj = {}
    data.forEach((value,key)=> obj[key]=value)
  
    fetch("/api/session/login3",{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(obj)
    })
    .then(respuesta => respuesta.json())
    .then(respuesta =>{
        if(respuesta.status==="error"){
            console.log(respuesta)
        }
        else{
        console.log("logueo exitoso")
        localStorage.setItem("authToken", respuesta.token)
        }
    })
    .catch(respuesta => console.log(respuesta))
 })

 const getCookies = ()=>{
    console.log(document.cookie)
 }
 