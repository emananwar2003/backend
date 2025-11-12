const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = 5050;
const url = process.env.db_url;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(url)
  .then(() => console.log("DB is connected"))
  .catch((err) => console.error("DB is not connected:", err));

// Routes

const authRouting = require("../routes/authRoutes");
app.use("/api/v1/auth", authRouting);

const productRoutes = require("../routes/ProductRoutes");
app.use("/api/v1/products", productRoutes);
const cartroute = require("../routes/cartRoutes");
app.use("/api/v1/cart", cartroute);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the backend",
  });
});

app.post("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to POST route",
  });
});

app.use((req, res) => {
  res.status(404).json({
    message: "Wrong Routing",
    data: null,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
