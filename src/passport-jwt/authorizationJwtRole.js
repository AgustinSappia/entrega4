const authorization = rol =>{
 return async (req,res,next)=>{
    if(!req.user) return res.status(401).send({status:"error",error:"Unauthorize"})
    if(req.user.rol !== rol) return res.status(403).send({status:"error",error:"Not permissions"})
    next()
}
}

module.exports={
    authorization
}

//esta middleware me sirve para detectar si el usuario que quiere ingresar a un link cumple con el role requirido 