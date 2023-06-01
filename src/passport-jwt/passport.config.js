const passport = require ("passport")
const jwt = require ("passport-jwt")
const { initPassport } = require("../config/passport.config")

const JWTStrategy = jwt.Strategy

const initPassport = () => {}

module.exports = {
    initPassport
}