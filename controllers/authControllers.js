const User = require("../models/userModel");

const bcrypt = require("bcrypt");

const sign = require("jwt-encode");

const register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        message: "All fields are required",
        data: null,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "This email is already registered",
        data: null,
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = User({
      name,
      email,
      phone,
      password: hashedPass,
      role,
    });

    await newUser.save();

    res.status(201).json({
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

const login = async (req, res) => {
  const { email, password } = req.body;

  const neededUser = await User.findOne(
    { email },
    { createdAt: 0, updatedAt: 0 }
  );

  if (!neededUser) {
    return res.status(400).json({
      message: "Unvalid Email",
      data: null,
    });
  }
  const SECRET_KEY =
    b5786de218af46bc7eebfba855715a445c6a276ec72c0e7de63b4a87cd9ea2b3;

  const token = sign(neededUser, SECRET_KEY);

  const check = await bcrypt.compare(password, neededUser.password);

  if (check) {
    return res.status(200).json({
      message: "Login successfully",
      data: {
        token,
        id: neededUser.id,
      },
    });
  } else {
    return res.status(400).json({
      message: "Invalid Password",
      data: null,
    });
  }
};

module.exports = { register, login };
