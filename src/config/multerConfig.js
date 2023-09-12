const multer = require ("multer")
const {extname,join} = require("path")
const { logger } = require("./logger")
const FILEPATH =  join(__dirname, '..', 'uploads')
const MIMETYPES =["image/jpeg","image/png","text/plain"]

const multerUpload = multer({
    storage: multer.diskStorage({
        destination:(req,file,cb)=>{
            if (file.fieldname === 'profileImage') {
                cb(null, join(FILEPATH, 'profiles'));
              } else if (file.fieldname === 'productImage') {
                cb(null, join(FILEPATH, 'products'));
              } else if (file.fieldname === 'document') {
                logger.info(join(FILEPATH, 'documents'))
                cb(null, join(FILEPATH, 'documents'));
              } else {
                logger.error("invalid fieldname")
                cb(new Error('Invalid fieldname'));
              }
        },
        filename: (req,file,cb)=>{
            const fileExtension = extname(file.originalname)
            const fileName = file.originalname.split(fileExtension)[0]
            cb(null,`${fileName}-${Date.now()}${fileExtension}`)
        },
    }),
    
    fileFilter: (req,file,cb)=>{
        if (MIMETYPES.includes(file.mimetype)) cb(null,true)
        else cb("el archivo a subir no esta permitido")
    } ,
    limits:{
        fieldSize: 10000000
    }
})

module.exports = {multerUpload}
