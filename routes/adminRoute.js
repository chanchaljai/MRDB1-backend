import express from "express";
import { getUser } from "../controllers/adminController.js";
import isAdmin from "../middleware/isAdmin.js";
const adminRoute = express.Router();

adminRoute.get("/getUser",isAdmin, getUser);

export default adminRoute;