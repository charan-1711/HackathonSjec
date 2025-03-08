import jwt from "jsonwebtoken";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { userModel } from "../models/userModel.js";

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
    const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      token,
      message: "Login successful",
    });
  }

  return res.status(401).json({ message: "Incorrect password" });
});

const signup = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password are required" });
  }

  const existingUser = await userModel.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(411).json("Email already exists..");
  }

  const user = await userModel.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });

  if (!user) {
    return res.status(411).json("Unable to create user");
  }

  const userId = user._id;

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.json({
    message: "User created successfully",
    token: token,
  });
});

export { signup, signin };
