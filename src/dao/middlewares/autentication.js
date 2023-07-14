const { logger } = require("../../config/logger")

function auth(req,res,next){
    logger.info("auth", req.session)

    next()
}

module.exports ={
    auth
}