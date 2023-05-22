console.log("conectado")
const form = document.getElementById("login2")

form.addEventListener("submit",(e)=> { 
    e.preventDefault()
    const data = new FormData(form)
    const obj = {}

    data.forEach((value,key)=> obj[key]=value)
  
    fetch("/session/login2",{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(obj)
    })
    .then(respuesta => respuesta.json())
    .then(respuesta =>console.log(respuesta))
 })
 
 const getCookies = ()=>{
    console.log(document.cookie)
 }
 