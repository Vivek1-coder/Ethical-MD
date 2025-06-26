import express from "express";
import { addMessage } from "../controllers/messageController.js";
import { isAuthorised } from "../middleware/authMiddleware.js";
import { validateUser } from "../middleware/validateUser.js";
const router = express.Router();

router.post("/:chatId/message", validateUser, addMessage);

export default router;
