// const commander = require('commander')

// const program = new commander.Command()

// program
//     .option('-d', 'Variable para debug', false)
//     .option('-p, --port <port>', 'Puerto para el servidor', 8080)
//     .option('--mode <mode>', 'Modo de trabajo', 'production')
//     .requiredOption('-u <user>', 'Usuario utilizando el appicativo', 'No se ha declarado un usuario')
//     .option('-l, --letters [letter...]', 'specify the letters')
    
// program.parse()

// El método .parse() es utilizado en la biblioteca Commander de Node.js para analizar los argumentos de línea de comandos y 
// opciones proporcionados por el usuario.

// Cuando usas .parse() en una instancia de Command, el programa leerá los argumentos y opciones pasados en la línea de comandos y 
// los analizará de acuerdo con la configuración definida en tu programa.

// En tu código de ejemplo, se define una instancia de Command llamada program. Luego, 
// se agregan varias opciones utilizando el método .option(). Estas opciones especifican qué argumentos y 
// opciones se esperan y cómo deben ser manejados.

// Después de haber agregado todas las opciones, se llama al método .parse() en la instancia program. 
// Esto iniciará el proceso de análisis de los argumentos y opciones proporcionados en la línea de comandos. 
// El resultado del análisis se almacenará en program.opts(), lo que te permitirá acceder a los valores proporcionados por el usuario en tu código.

// En resumen, el método .parse() en Commander se utiliza para analizar los argumentos y opciones de línea de comandos y 
// capturar los valores proporcionados por el usuario para su posterior uso en tu programa.

// console.log('options: ', program.opts())
// console.log('Remaining Arguments: ', program.args)


// node commander.js -d -p 3000 --mode develpment -u root --letters a b c
// node commander.js -d -p 3000 -u root 2 a 5 --letters fede


process.on('exit', code => {
    console.log('se ejecuta justo antes de terminar el processo', code)
})
process.on('uncaughtException', exception => {
    console.log('se ejecuta justo con alguna exception')
})
process.on('message', message => {
    console.log('muestra el mensaje de otro processo')
})

console()