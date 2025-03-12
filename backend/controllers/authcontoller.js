import jwt from "jsonwebtoken";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import userModel from "../models/userModel.js";

const JWT_SECRET = "123456";

const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password are required" });
  }

  const existingUser = await userModel.findOne({ email });
  if (!existingUser) {
    return res.status(404).json({ msg: "User doesn't exist" });
  }

  if (existingUser.password === password) {
    const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET);

    return res.status(200).json({
      token,
      message: "Login successful",
    });
  }

  return res.status(401).json({ message: "Incorrect password" });
});

const addUser = asyncHandler(async (req, res) => {
  // ✅ Fetch admin user from DB
  const adminUser = await userModel.findById(req.userId);

  console.log(adminUser);

  if (!adminUser || adminUser.role !== "admin") {
    return res.status(403).json({ msg: "Access denied. Admins only." });
  }

  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({ msg: "Name, email, and role are required" });
  }

  // ✅ Check if user already exists
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ msg: "Email already exists" });
  }

  // ✅ Default password for new users
  const defaultPassword = "1234567";

  // ✅ Create new user
  const user = await userModel.create({
    name,
    email,
    password: defaultPassword,
    role,
  });

  if (!user) {
    return res.status(500).json({ msg: "Failed to create user" });
  }

  res.status(201).json({
    message: "User added successfully",
    userId: user._id,
  });
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ msg: "Old and new passwords are required" });
  }

  const user = await userModel.findById(req.userId);
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  if (user.password !== oldPassword) {
    return res.status(401).json({ msg: "Incorrect old password" });
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({ message: "Password changed successfully" });
});

export { addUser, signin, changePassword };
