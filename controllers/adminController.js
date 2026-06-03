import User from "../models/User.js";
export const getUser = async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}