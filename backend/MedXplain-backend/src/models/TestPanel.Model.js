import mongoose from "mongoose";

export const TestPanelSchema = new mongoose.Schema({
  panelName: { type: String, required: true },        // e.g., "Complete Blood Count (CBC)"
  parameters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Parameter' }],
});

export const TestPanelModel = mongoose.model('TestPanel', TestPanelSchema);
