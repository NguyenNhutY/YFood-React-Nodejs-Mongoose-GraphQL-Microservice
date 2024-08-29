import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderid: mongoose.Schema.Types.ObjectId,
  item: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: "Food Processing" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isDelivered: { type: Boolean, default: false },
  deliveredAt: { type: Date, default: null },
  paymentMethod: { type: String, required: true },
  deliveryFee: { type: Number, required: true },
  payment: { type: Boolean, default: false },
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
const orderModel = mongoose.model("order", orderSchema) || mongoose.model.order;

export default orderModel;
