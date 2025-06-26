import mongoose from "mongoose";
const { Schema } = mongoose;
const SummarySchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  metrics: {
    type: Map,
    of: Schema.Types.Mixed,
    required: true,
  },
  remarks: {
    type: String,
    default: "",
  },
  summary: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
    required: true,
  },
  actionable_insights: {
    type: [String],
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

const SummaryModel = mongoose.model("Metrics", SummarySchema);
export { SummaryModel };
