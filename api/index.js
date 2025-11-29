const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5050;
const url = process.env.db_url;

let allowed_URL = [
  "https://groovystitches.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowed_URL.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
console.log("DB_URL from env ===>", process.env.DB_URL);
console.log("PORT from env ===>", process.env.PORT);

// Connect to MongoDB
mongoose
  .connect(url)
  .then(() => console.log("DB is connected"))
  .catch((err) => console.log(`DB is diconnected due to ${err.message}`));

// Routes - Paths are correct for api/index.js structure
const authRouting = require("../routes/authRoutes");
app.use("/api/v1/auth", authRouting);

const productRoutes = require("../routes/productRoutes");
app.use("/api/v1/products", productRoutes);

const cartroute = require("../routes/cartRoutes");
app.use("/api/v1/cart", cartroute);

const userRoutes = require("../routes/userRoutes");
app.use("/api/v1/users", userRoutes);

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

// 404 handler - must be last
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
