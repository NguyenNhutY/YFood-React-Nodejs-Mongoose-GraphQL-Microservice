import mongoose from "mongoose";

const promocodeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  code: { type: String, required: true, unique: true },
  discount: { type: Number, required: true },
  usageLimit: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  usedBy: [
    {
      userId: mongoose.Schema.Types.ObjectId,
      orderId: mongoose.Schema.Types.ObjectId,
    },
  ],
  usedAt: Date,
  expiredAt: Date,
  appliedAt: Date,
  redeemedAt: Date,
  usedCount: { type: Number, default: 0 },
  redeemedCount: { type: Number, default: 0 },
  appliedCount: { type: Number, default: 0 },
  redeemedBy: [{ userId: mongoose.Schema.Types.ObjectId }],
  redeemedAt: Date,
});

const promocodeModel =
  mongoose.model.promocode || mongoose.model("promocode", promocodeSchema);

export default promocodeModel;
