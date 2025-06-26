import express from "express";
import {
  createNewChat,
  getUserChats,
  getChatById,
  renameChat,
  deleteChat,
} from "../controllers/chatController.js";
// import { isAuthorised } from "../middleware/authMiddleware.js";
import { validateUser } from "../middleware/validateUser.js";
import { addMessage } from "../controllers/messageController.js";
const router = express.Router();

router.post("/new-session", validateUser, createNewChat);
router.get("/allChats", validateUser, getUserChats);
router.post("/loadChat", validateUser, getChatById);
router.patch("/:chatId/title", validateUser, renameChat);
router.delete("/:chatId", validateUser, deleteChat);
router.post("/query", validateUser, addMessage);

export default router;
