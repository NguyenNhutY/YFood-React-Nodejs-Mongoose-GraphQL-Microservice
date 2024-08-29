// models/commentModel.js
import mongoose from "mongoose";

const customerReviewSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  foodId: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
  title: String,
  content: String,
  rating: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  deletedAt: Date,
  isAnonymous: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  isSpam: { type: Boolean, default: false },
  isReported: { type: Boolean, default: false },
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isDeleted: { type: Boolean, default: false },
  file: { type: Array },
});

const customerReviewModel = mongoose.model("customerReview", customerSchema);

export default customerReviewModel;
