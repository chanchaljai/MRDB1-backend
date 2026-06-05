import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// register
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    // check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    res.status(201).json({ user, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }
    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    // create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // add token to cookie
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      sameSite: none,  // deployent time none local lax
      secure: true, // deployment time true local false
    });
    // send user
    res
      .status(200)
      .json({ user, message: "Login successful", role: user.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
