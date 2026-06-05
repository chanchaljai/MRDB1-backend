import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import adminRoute from "./routes/adminRoute.js";

dotenv.config();
connectDB();

const app = express();

const allowedOrigin = [
  "http://localhost:5173",
  process.env.CLIENT_URL
];

// ✅ FIX 1: CORS (production safe)
app.use(cors({
  origin:  allowedOrigin,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
}));

// ✅ FIX 2: body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);

// test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ FIX 3: PORT safe
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});