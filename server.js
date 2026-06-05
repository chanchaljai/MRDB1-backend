import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import adminRoute from "./routes/adminRoute.js";
connectDB();
const app = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 5000;
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.get("/", (req, res) => {
  res.send("Hello from the backend");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
