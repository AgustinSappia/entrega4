const cluster = require("cluster")
const {cpus} = require("os")
const { initServer } = require("./server")


console.log(cluster.isPrimary)
const numProcesadores = cpus().length
console.log("cantidad de hilos =" +numProcesadores)



initServer()