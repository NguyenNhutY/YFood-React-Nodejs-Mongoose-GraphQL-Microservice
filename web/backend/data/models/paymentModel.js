import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  amount: Number,
  status: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  paidAt: Date,
  refundedAt: Date,
  paymentMethod: String,
  transactionId: String,
  last4Digits: String,
  cardBrand: String,
  cardHolderName: String,
  cardExpiration: String,
  cardCvc: String,
  isRefund: Boolean,
  refundReason: String,
  refundAmount: Number,
  refundTransactionId: String,
  refundLast4Digits: String,
  refundCardBrand: String,
  refundCardHolderName: String,
  refundCardExpiration: String,
  refundCardCvc: String,
});

const paymentModel =
  mongoose.model.paymen || mongoose.model("paymet", paymentSchema);

export default paymentModel;
