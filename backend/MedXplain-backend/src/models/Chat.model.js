import mongoose from "mongoose";
import { messageSchema } from "./Message.Model.js";

const chatSchema = new mongoose.Schema({
  title: { type: String, default: "New Chat" }, // editable title
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  messages: [messageSchema],
  summary: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

chatSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model("Chat", chatSchema);
