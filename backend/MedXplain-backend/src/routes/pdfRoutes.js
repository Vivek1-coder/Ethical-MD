import express from "express";
const router = express.Router();
import multer from "multer";
import { extractLabReportData } from "../controllers/pdfParseController.js";
import { PreprocessReport } from "../controllers/preProcessController.js";
import { validateUser } from "../middleware/validateUser.js";
// Ensure uploads directory exists
const uploadDir = "uploads/";
import { promises as fs } from "fs";
fs.mkdir(uploadDir, { recursive: true }).catch(console.error);
// import { isAuthorised } from "../middleware/authMiddleware.js";

// File upload config
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 10, // 10MB limit
  },
});

router.post(
  "/analyze-lab-report",
  validateUser,
  upload.single("pdf"),
  extractLabReportData, // Middleware to extract text from PDF and that text is passed to next route handler
  PreprocessReport //Router handler to preprocess the extracted text and return response
);

export default router;
