import mongoose from "mongoose";

export const PatientSchema = new mongoose.Schema({
  patientId: { type: String, unique: true, required: true },  // unique patient identifier
  name: { type: String, required: true },
  age: { type: Number },
  sex: { type: String, enum: ['Male', 'Female', 'Other'] },
  contactInfo: {
    phone: String,
    email: String,
  },
  createdAt: { type: Date, default: Date.now },
});

export const PatientModel = mongoose.model('Patient', PatientSchema);
