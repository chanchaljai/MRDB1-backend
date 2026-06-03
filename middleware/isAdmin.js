import jwt from "jsonwebtoken";
import User from "../models/User.js";
const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "user not found" });
    }
    if (user.role !== "admin") {
      return res.status(403).json({ message: "you are not admin" });
    }
    next();
  } catch {
    res.status(500).json({ error: error.message });
  }
};

export default isAdmin;
