const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");

const port = 5050;
const url = process.env.db_url;
app.use(express.json());


mongoose
  .connect(url)
  .then(() => {
    console.log("DB is connected");
  })
  .catch((err) => {
    console.log("DB is not connected", err);
  });

const authRouting = require("../routes/authRoutes");
app.use("/api/v1/auth", authRouting);
app.use("/api/v1/login", authRouting);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "welcome back end",
  });
});

// for menna "post"
app.post("/", (req, res) => {
  res.status(200).json({
    message: "welcome to get data",
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
