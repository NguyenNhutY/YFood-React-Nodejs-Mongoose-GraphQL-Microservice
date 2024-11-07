import mongoose from "mongoose";

const employee_activeSchema = new mongoose.Schema({
  action: { type: "String", required: true },
  changed_at: { type: "Date", required: true, default: null },
  old_change_at: { type: "Date", required: true, default: new Date() },
  new_change_text: { type: "String" },
});
