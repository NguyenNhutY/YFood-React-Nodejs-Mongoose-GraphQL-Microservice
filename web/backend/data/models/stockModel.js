import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  material_id: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
  quantity: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  restockedAt: Date,
  soldAt: Date,
  orderedAt: Date,
  orderedQuantity: Number,
  restockQuantity: Number,
  soldQuantity: Number,
  deliveredQuantity: Number,
  deliveredAt: Date,
  canceledQuantity: Number,
  canceledAt: Date,
  returnedQuantity: Number,
  returnedAt: Date,
  dispatchedQuantity: Number,
  dispatchedAt: Date,
});

const stockModel = mongoose.model.stock || mongoose.model("stock", stockSchema);

export default stockModel;
