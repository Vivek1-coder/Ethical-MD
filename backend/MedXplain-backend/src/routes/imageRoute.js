// routes/uploadRoute.js
import express from "express";
import multer from "multer";
import fs from "fs/promises";
import { extractText } from "../controllers/imageController.js";
import { PreprocessReport } from "../controllers/preProcessController.js";
import { validateUser } from "../middleware/validateUser.js";

const uploadDir = "uploads/";
await fs.mkdir(uploadDir, { recursive: true }).catch(console.error);

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

const router = express.Router();

router.post(
  "/analyze-lab-report",
  // isAuthorised,
  validateUser,
  upload.single("image"),
  extractText, // Middleware to extract text from image , that text is passed to next route handler
  PreprocessReport //Router handler to preprocess the extracted text and return response
);

export default router;
