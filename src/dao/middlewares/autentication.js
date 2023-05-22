function auth(req,res,next){
    console.log("auth", req.session)

    next()
}

module.exports ={
    auth
}