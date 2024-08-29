import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    role: { type: String, default: "user" },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String, default: "active" },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now },
    forgotPasswordToken: String,
    forgotPasswordExpires: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    isEmailVerified: { type: Boolean, default: false },
    emailVerificationToken: String,
    emailVerificationExpires: Date,
  },
  { minimize: false }
);

const Account =
  mongoose.model("Account", accountSchema) || mongoose.model.account;

export default Account;
