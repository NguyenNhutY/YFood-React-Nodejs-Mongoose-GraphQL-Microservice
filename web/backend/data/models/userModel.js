import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true },
    phone: { type: String },
    avatar: { type: String },
    address: { type: String },
    birthDate: { type: Date },
    gender: { type: String },
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
    email: { type: String, required: true, unique: true },
    location: { type: String },
    password: { type: String, required: true },
  },
  { minimize: false }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
