import mongoose from "mongoose";

const employee_activeSchema = new mongoose.Schema({
  action: { type: "String", required: true },
  changed_at: { type: "Date", required: true, default: null },
  old_change_at: { type: "Date", required: true, default: new Date() },
  new_change_text: { type: "String" },
  employee_id: { type: mongoose.Schema.Types.ObjectId, ref: "Employee"},
  food_id:{ type: mongoose.Schema.Types.ObjectId, ref: "Food"},
  material_id:{ type: mongoose.Schema.Types.ObjectId,ref: "Material"},
});

const Employee_activeModel = mongoose.models.employee_activeSchema.create({