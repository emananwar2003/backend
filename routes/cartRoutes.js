const express = require("express");
const router = express.Router();
const {
    addToCart,
    getCart,
    removeFromCart,
    clearCart,
} = require("../controllers/cartController");
const userAuth = require("../middleware/userAuth");
router.post("/", userAuth, addToCart);


router.get("/", userAuth, getCart);


router.delete("/", userAuth,clearCart);


router.patch("/", userAuth, removeFromCart); 




module.exports = router;