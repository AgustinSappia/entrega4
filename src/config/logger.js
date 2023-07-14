const winston = require("winston")
const dotenv = require('dotenv')
// const logger = winston.createLogger({
//     transports:[
//         new winston.transports.Console({level: "http"}),
//         new winston.transports.File({filename:"./errors.log", lever:"warn"})
//     ]
// })

const customLevelOption ={
    levels:{
        fatal:0,
        error:1,
        warning:2,
        info:3,
        http:4,
        debug:5
    },
    colors:{
        fatal:"red",
        error:"red",
        warning:"yellow",
        info:"blue",
        http:"white",
        debug:"white"       
    }
}


let loggerOptions

 if (process.env.DEVELOPMENT_MODE){
  loggerOptions= {
    levels: customLevelOption.levels,
    transports:[
        new winston.transports.Console({
            level:"debug",
            format: winston.format.combine(
                winston.format.colorize({colors:customLevelOption.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename:"./errors.log",
             level:"warning",
             format: winston.format.simple()
            })
    ]
    }

}
else{
     loggerOptions= {
        levels: customLevelOption.levels,
        transports:[
            new winston.transports.Console({
                level:"info",
                format: winston.format.combine(
                    winston.format.colorize({colors:customLevelOption.colors}),
                    winston.format.simple()
                )
            }),
            new winston.transports.File({
                filename:"./errors.log",
                 level:"warning",
                 format: winston.format.simple()
                })
        ]
    }
}

let logger = winston.createLogger(loggerOptions)





//middleware 

const addLogger = (req,res,next)=>{
    req.logger = logger
    // req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleDateString()}`)
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleDateString()}`)
    next()
}



module.exports = {
    logger,
    addLogger
}