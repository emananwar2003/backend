const Product = require("../models/products");
const mongoose = require("mongoose"); // Import mongoose to check for valid IDs

// Handles adding a single product OR an array of products (bulk insert)
exports.addProduct = async (req, res) => {
  try {
    // NEW LOGIC: Check if the request body is an array for bulk insertion
    if (Array.isArray(req.body)) {
      const savedProducts = await Product.insertMany(req.body);
      // Return a 201 with the list of created products
      return res.status(201).json({
        message: `${savedProducts.length} products created successfully (Bulk Insert)`,
        data: savedProducts,
      });
    }

    // Logic for single product insertion
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    // 400 Bad Request for validation/schema errors (e.g., missing required fields like 'name' or 'id')
    res.status(400).json({ error: error.message });
  }
};

// Function to update a product by its MongoDB ObjectId
exports.updateProduct = async (req, res) => {
  try {
    // VALIDATION: Check for a valid Mongoose ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Product ID format" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // {new: true} returns the updated doc, {runValidators: true} ensures update adheres to schema rules
    );

    // 404 CHECK: Check if a product was actually found
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    // 400 for validation errors during update
    res.status(400).json({ error: error.message });
  }
};

// Function to delete a product by its MongoDB ObjectId
exports.deleteProduct = async (req, res) => {
  try {
    // VALIDATION: Check for a valid Mongoose ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Product ID format" });
    }

    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    // 404 CHECK: Check if a product was actually found and deleted
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    // 500 for general database errors
    res.status(500).json({ error: error.message });
  }
};

// Function to get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    // 500 for general database errors
    res.status(500).json({ error: error.message });
  }
};

// Function to get a single product by its MongoDB ObjectId
exports.getProductById = async (req, res) => {
  try {
    // VALIDATION: Check for a valid Mongoose ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Product ID format" });
    }

    const product = await Product.findById(req.params.id);

    // 404 CHECK: Check if the product was found
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    // 500 for general database errors
    res.status(500).json({ error: error.message });
  }
};
