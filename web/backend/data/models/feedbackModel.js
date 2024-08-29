// models/commentModel.js
import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  email: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Tham chiếu tới User
});

const feedbackModel = mongoose.model("feedback", feedbackSchema);

export default feedbackModel;
