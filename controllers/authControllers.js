const User = require("../models/userModel");

const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { name, email, phone, password } = req.body;

  //check law el mail mawgod abl keda bel findone

  const hashedPass = await bcrypt.hash(password, 10);

  try {
    const newUser = User({
      name,
      email,
      phone,
      password: hashedPass,
    });

    await newUser.save();

    res.status(200).json({
      message: "Register Successe",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
      data: null,
    });
  }
};

module.exports = { register };
