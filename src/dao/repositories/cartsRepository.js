
class CartsRepository{

    constructor(dao){
        this.dao = dao
    }

    getCarts = async()=>{
       let carts= await this.dao.getCarts()
       return await carts
    }

    createCart = async()=>{
        return await this.dao.createCart
    }
    searchCartById = async(id)=>{

        return await this.dao.searchCartById(id)

    }
    postProductInCart = async(pid,cid)=>{
        return await this.dao.addProduct(pid,cid)
    }

    deleteProduct = async(cid,pid)=>{
        return await this.dao.deleteProduct(cid,pid)
    }
    deleteCart = async(cid)=>{
        return await this.dao.deleteCart(cid)
    }

    pucharseCart = async(cid,client)=>{
        return await this.dao.pucharseCart(cid,client)
    }
}

module.exports = CartsRepository