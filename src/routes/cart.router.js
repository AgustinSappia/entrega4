const {Router} = require("express")

const router = Router()

const {getCarts,postCarrito,getCartId,postProductInCart,putCart,putProductInCart,deleteProductInCart,deleteCart} = require("../controllers/cart.controller")



router.get("/",getCarts)
router.post("/",postCarrito)
router.get("/cart/:cid",getCartId)
router.post("/:cid/products/:pid",postProductInCart)
router.put("/:cid",putCart)
router.put("/:cid/products/:pid",putProductInCart)
router.delete("/:cid/products/:pid",deleteProductInCart)
router.delete("/:cid",deleteCart)



module.exports = router