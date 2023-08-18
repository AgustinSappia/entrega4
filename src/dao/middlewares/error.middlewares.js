const { logger } = require("../../config/logger");
const { EError } = require("../../utils/CustomError/EErrors");

exports.errorHandler = (error,req,res,next)=>{
    logger.error(error)
    logger.error(error.cause)
    switch (error.code){
        case EError.INVALID_TYPE_ERROR:
            return res.send({status: "NoTypeError",error:error.name})
            break;

            case EError.DATABASE_ERROR:
                return res.send({status: "DatabaseError",error:error.name})
                break;

            default: 
                return res.send({status: "error", error:"error no contemplado"})
                break;
    }


}
