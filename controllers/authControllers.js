const User = require("../models/userModel");

const bcrypt = require("bcrypt");

const sign = require("jwt-encode");

const register = async (req, res) => {
  const { name, email, phone, password } = req.body;

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

const login = async (req, res) => {
  const { email, password } = req.body;

  const neededUser = await User.findOne(
    { email },
    { createdAt: 0, updatedAt: 0 }
  );

  const token = sign(neededUser,process.env.SECRET_KEY);


  if (!neededUser) {
    return res.status(400).json({
      message: "Unvalid Email",
      data: null,
    });
  }

  const check = await bcrypt.compare(password, neededUser.password);

  if (check) {
    return res.status(200).json({
      message: "Login successfully",
      data: {
        token,
        id:neededUser.id,
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
