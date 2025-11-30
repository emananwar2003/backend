const express = require("express");
const router = express.Router();

const {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
} = require("../controllers/productController");

// CREATE single or bulk
router.post("/", addProduct);

// GET all
router.get("/", getAllProducts);

// GET one
router.get("/:id", getSingleProduct);

// UPDATE
router.put("/:id", updateProduct);

// DELETE
router.delete("/:id", deleteProduct);

module.exports = router;
