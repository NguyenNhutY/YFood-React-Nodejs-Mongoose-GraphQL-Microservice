import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

const quizModel = mongoose.model.quiz || mongoose.model("quiz", quizSchema);

export default quizModel;
