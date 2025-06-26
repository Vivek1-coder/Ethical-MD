import express from "express";
import {
  signupUser,
  loginUser,
  // LogoutUser,
} from "../controllers/authController.js";
import { validateUser } from "../middleware/validateUser.js";
import { extractLabReportData } from "../controllers/pdfParseController.js";
import multer from "multer";
import path from "path";

const router = express.Router();
router.post("/signup", signupUser);
router.post("/login", loginUser);
// router.post('/parse-lab-report', upload.single('pdf'), extractLabReportData);
export default router;
