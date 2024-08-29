// models/commentModel.js
import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  age: Number,
  department: String,
  isActive: { type: Boolean, default: true },
  hireDate: { type: Date, default: Date.now },
  salary: Number,
  position: String,
  supervisor: String,
  reports: [String], // Array of employee IDs (foreign key)
  // Add more fields as needed
});

const employeeActiveModel = mongoose.model("employee", employeeSchema);

export default employeeSchema;
