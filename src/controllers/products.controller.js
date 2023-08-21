
const passport = require("passport")
const { productService } = require("../services")
const { CustomError } = require("../utils/CustomError/customError")
const { generatePoductErrorInfo } = require("../utils/CustomError/info")
const { EError } = require("../utils/CustomError/EErrors")

const prodManager = productService

class ProductsController{

    
     getProducts = async (request,response)=>{
        try{
            let {limit=3,page=1,query,data,sort} = request.query    
            let filtro = {}     //creamos un filtro usando los query params de query y data
            let orden ={price:sort}
            
            if (query||data){
                filtro[query] = data
            }
            let esNumero = isNaN(limit)
            
            let productos = await prodManager.getProductPaginate(page,limit,filtro,orden)
            const {docs,hasPrevPage,hasNextPage,prevPage,nextPage,totalPages} = productos
            let nextLink = "/api/products?page="+nextPage
            let prevLink ="/api/products?page="+prevPage
            let session = request.user
            console.log(session)
            
            if(!esNumero){
                limit=2  //si no ingresa un limite valido lo dejo en 10 que es el por defecto
            }
            if(!docs || docs.length === 0 ){
                response.render("productos",{exist:false})
        }
        else{
            response.render
            ("productos",{
                status:"success",
                payload:docs,
                exist: true,
                totalPages,
                hasPrevPage,
                hasNextPage,
                prevPage: !prevPage? "no exist":prevPage,
                nextPage,
                page,
                nextLink: !hasNextPage? "no found" : nextLink ,
                prevLink: !hasPrevPage? "no exist" : prevLink,
                session
            })
            
            
        }
    }
    catch(error){
        req.logger.error(error)
        res.send(error)
    }
}

 getProductId = async(request,response)=>{
    try{
        let id = await request.params.pid
        let producto = await prodManager.getProductById(id)   
        if(!producto){
            response.send("el producto no existe").status(400)
        }
        else{
            response.status(200).send(producto)
        }
        
        
    }
    catch(error){ 
        response.send("no existe el producto").status(500)
        return error
    }
}

 postProduct =async (req,res,next)=>{    //
    try{
        console.log("error")
        let ValueOwner = req.user.email
        let newProduct = await req.body
        newProduct.owner = !ValueOwner? "admin" : ValueOwner

        // let{title,description,price,thumbnail,code,stock} = newProduct
        if(!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.thumbnail || !newProduct.code || !newProduct.stock){

            CustomError.createError({
                name:"User creation error",
                cause: generatePoductErrorInfo(newProduct),
                message: "Error trying to create product",
                code:EError.INVALID_TYPE_ERROR
            })
        }
        await prodManager.addProduct(newProduct)
        res.status(200).send({newProduct})
    }
    catch(error){
        console.log(error)
        next(error)
    }
}

 putProduct = async(req,res)=>{
    try{
        
        let {pid} = req.params
        modif = req.body
        let result = await prodManager.updateProduct(pid,modif)
        res.status(200).send({
            status:"sucess",
            payload: result
        })
    }
    catch(error){
        res.status(500).send(error)
    }
 }
 
  deleteProduct = async(req,res)=>{
     try{
         let {pid} = req.params
         res.status(200).send(await prodManager.deleteProduct(pid))
        }
        catch (error){
            res.status(500).send(error)
        }
    }
    
    
    
}
    module.exports = new ProductsController()
        
    