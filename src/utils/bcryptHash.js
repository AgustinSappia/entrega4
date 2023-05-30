const bcrypt = require("bcrypt")


// creamos el hash

const createHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10)) // genSaltSync es el proceso de encriptacion, el numero 10 es la cantidad de digitos que va a tener la key

// generar la fincion para comparar

const isValidPassword = (user,password) => bcrypt.compareSync(password, user.password)

module.exports = {createHash, isValidPassword}