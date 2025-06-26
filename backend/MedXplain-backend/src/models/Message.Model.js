import mongoose from "mongoose";

export const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true,
  },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});
