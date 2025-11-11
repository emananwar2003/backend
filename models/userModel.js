const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
      unique: [true, "User Email Already exists , try to Login"],
    },
    phone: {
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
  },
  { timestamps: true } //created at & updated at
);

module.exports = mongoose.model("Users", userModel); //esm el key + object model
