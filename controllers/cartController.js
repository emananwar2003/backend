const cart = require("../models/cartmodel");

const addToCart = async (req, res) => {
    try {
    const userId = req.user._id;
    const { productId } = req.body;

    let userCart = await cart.findOne({ user: userId });

    if (userCart) {
    
        userCart.products = [...userCart.products, { productid: productId }];
        await userCart.save(); 
    } else {

            userCart = new cart({
            user: userId,
            products: [{ productid: productId }],
        });
        await userCart.save();
    }



        res.status(200).json({ message: "Product added to cart" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const userCart = await cart.findOne({ user: userId }).populate("products.productid");
        if (!userCart) return res.status(200).json({ products: [] });
        res.status(200).json(userCart);
    } catch (error) {
        console.error("Get cart error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const removeFromCart = async (req, res) => {
    try {
    const userId = req.user._id;
    const { productId } = req.body;
    const userCart = await cart.findOne({ user: userId });
    if (!userCart) return res.status(404).json({ message: "Cart not found" });

        userCart.products = userCart.products.filter(
            (item) => item.productid.toString() !== productId
        );

        await userCart.save();
        res.status(200).json({ message: "Product removed", cart: userCart });
    } catch (error) {
        res.status(500).json({ message:error.message });
    }
};

const clearCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const userCart = await cart.findOne({ user: userId });
        if (!userCart) return res.status(404).json({ message: "Cart not found" });

        userCart.products = [];
        await userCart.save();
        res.status(200).json({ message: "Cart cleared successfully", cart: userCart });
    } catch (error) {
    res.status(500).json({ message: error.message });
}
};

module.exports = {
    addToCart,
    getCart,
    removeFromCart,
    clearCart,
};
