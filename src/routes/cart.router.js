const {Router} = require("express")
const { passportCall } = require("../passport-jwt/passportCall")

const router = Router()

const {getCarts,postCarrito,getCartId,postProductInCart,putCart,putProductInCart,deleteProductInCart,deleteCart,pucharse,renderPucharse} = require("../controllers/cart.controller")



router.get("/",passportCall("jwt"),getCarts)
router.get("/:cid",passportCall("jwt"),getCartId)
router.get("/:cid/pucharse",passportCall("jwt"),renderPucharse)
router.post("/:cid/pucharse",passportCall("jwt"),pucharse)
router.post("/",postCarrito)
router.post("/:cid/products/:pid",postProductInCart)
router.put("/:cid",putCart)
router.put("/:cid/products/:pid",putProductInCart)
router.delete("/:cid/products/:pid",deleteProductInCart)
router.delete("/:cid",deleteCart)



module.exports = router