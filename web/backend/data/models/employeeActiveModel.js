// models/commentModel.js
import mongoose from "mongoose";

const employeeActiveSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date, default: Date.now },
  lastLogout: { type: Date, default: null },
  lastActivity: { type: Date, default: null },
  lastChange: { type: Date, default: null },
  lastPasswordChange: { type: Date, default: null },
  lastPasswordReset: { type: Date, default: null },
  lastPasswordResetBy: { type: String, default: null },
  lastPasswordResetToken: { type: String, default: null },
  lastPasswordResetTokenExpiration: { type: Date, default: null },
  lastFailedLoginAttempts: { type: Number, default: 0 },
  lastFailedLoginAttempt: { type: Date, default: null },
  lastFailedLoginAttemptIP: { type: String, default: null },
  lastFailedLoginAttemptBy: { type: String, default: null },
  lastFailedLoginAttemptByIP: { type: String, default: null },
  lastFailedLoginAttemptByUserAgent: { type: String, default: null },
  lastFailedLoginAttemptByLocation: { type: String, default: null },
  lastFailedLoginAttemptByCountry: { type: String, default: null },
});

const employeeActiveModel = mongoose.model(
  "employeeActive",
  employeeActiveSchema
);

export default employeeActiveModel;
