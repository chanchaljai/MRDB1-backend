import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import adminRoute from "./routes/adminRoute.js";
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 5000;
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.get("/", (req, res) => {
  res.send("Hello from the backend");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
