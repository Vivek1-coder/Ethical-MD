import mongoose from "mongoose";

export const LabReportSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  reportDate: { type: Date, required: true },
  testPanels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TestPanel' }],
  
  summary: { type: String },
  actionableInsights: { type: String },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

LabReportSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export const LabReportModel = mongoose.model('LabReport', LabReportSchema);
