// const bcrypt = require("bcryptjs");
// const mongoose = require("mongoose");
// const User = require("../models/userModel");

// // Create user
// exports.createUser = async (req, res) => {
//   try {
//     const { name, email, phone, password, role } = req.body;

//     if (!name || !email || !phone || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const exists = await User.findOne({ email });
//     if (exists)
//       return res.status(409).json({ message: "Email already exists" });

//     const hashed = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       name,
//       email,
//       phone,
//       password: hashed,
//       role: role || "user",
//     });

//     const saved = await newUser.save();

//     const user = saved.toObject();
//     delete user.password;

//     res.status(201).json({
//       message: "User created successfully",
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get all users
// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find().select("-password");
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get one user
// exports.getUserById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!mongoose.isValidObjectId(id))
//       return res.status(400).json({ message: "Invalid user id" });

//     const user = await User.findById(id).select("-password");

//     if (!user) return res.status(404).json({ message: "User not found" });

//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update user
// exports.updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, email, phone, password, role } = req.body;

//     if (!mongoose.isValidObjectId(id))
//       return res.status(400).json({ message: "Invalid user id" });

//     const updateData = { name, email, phone, role };

//     if (password) {
//       const hashed = await bcrypt.hash(password, 10);
//       updateData.password = hashed;
//     }

//     const updatedUser = await User.findByIdAndUpdate(id, updateData, {
//       new: true,
//     }).select("-password");

//     if (!updatedUser)
//       return res.status(404).json({ message: "User not found" });

//     res.json({
//       message: "User updated successfully",
//       user: updatedUser,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete user
// exports.deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!mongoose.isValidObjectId(id))
//       return res.status(400).json({ message: "Invalid user id" });

//     const deletedUser = await User.findByIdAndDelete(id);

//     if (!deletedUser)
//       return res.status(404).json({ message: "User not found" });

//     res.json({ message: "User deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
