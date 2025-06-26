import mongoose from "mongoose";
export const ParameterSchema = new mongoose.Schema({
  name: { type: String, required: true },           // e.g., Hemoglobin
  value: { type: Number, required: true },
  unit: { type: String },
  referenceRange: { type: String },
  flag: { type: String, enum: ['High', 'Low', 'Normal'], default: 'Normal' },
});

export const ParameterModel = mongoose.model('Parameter', ParameterSchema);
