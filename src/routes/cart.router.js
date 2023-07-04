const {Router} = require("express")
const { passportCall } = require("../passport-jwt/passportCall")

const router = Router()

const {getCarts,postCarrito,getCartId,postProductInCart,putCart,putProductInCart,deleteProductInCart,deleteCart,pucharse} = require("../controllers/cart.controller")



router.get("/",getCarts)
router.get("/:cid",getCartId)
router.post("/:cid/pucharse",passportCall("jwt"),pucharse)
router.post("/",postCarrito)
router.post("/:cid/products/:pid",postProductInCart)
router.put("/:cid",putCart)
router.put("/:cid/products/:pid",putProductInCart)
router.delete("/:cid/products/:pid",deleteProductInCart)
router.delete("/:cid",deleteCart)



module.exports = router