console.log("Socket")
const socket = io()

let formularioProductos=document.querySelector("#formularioProductos")


formularioProductos.addEventListener("submit",event =>{
event.preventDefault()
let title = formularioProductos.elements.title.value
let description = formularioProductos.elements.description.value
let price = formularioProductos.elements.price.value
let thumbnail = formularioProductos.elements.thumbnail.value
let code = formularioProductos.elements.code.value
let stock = formularioProductos.elements.stock.value
if (title!== "") {  //---agregar las verificaciones---
    socket.emit ("addProduct",{title,description,price,thumbnail,code,stock})       //podria poder la verificacion del productManager aqui
}   
formularioProductos.reset()
})


socket.on("productos",data =>{
    console.log(data)
    let listaProd = document.getElementById("productosId")
    let liProducto =""
    data.forEach(producto => {
        liProducto += `<li>PRECIO: ${producto.title}--|--ID:${producto.id}</li>`

        
    });
    console.log(liProducto)
    listaProd.innerHTML = liProducto
})