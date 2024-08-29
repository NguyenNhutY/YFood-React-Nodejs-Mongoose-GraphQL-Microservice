// models/commentModel.js
import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Tham chiếu tới User
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], // Tham chiếu tới Comments (bảng này s�� tạo liên kết với bảng Comment)
  type: { type: String, required: true },
  difficulty: { type: String, required: true },
  caloriesBurned: { type: Number, required: true },
  stepsTaken: { type: Number, required: true },
  distanceCovered: { type: Number, required: true },
  averageHeartRate: { type: Number, required: true },
  weightLifted: { type: Number, required: true },
  weightLoss: { type: Number, required: true },
  weightGain: { type: Number, required: true },
  bodyFatPercentage: { type: Number, required: true },
});

const exerciseModel = mongoose.model("exercise", exerciseSchema);

export default exerciseModel;
