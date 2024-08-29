import express from "express";
import {
  loginUser,
  registerUser,
  updateUserProfile,
  getUserById,
  createSystemNotification,
  getSystemNotifications,
  updatePassword,
  toggleAccountStatus,
  resendVerificationEmail,
  getAllUsers,
} from "../controllers/userController.js";

const userRoute = express.Router();

// Register a new user
userRoute.post("/register", registerUser);

// Login a user
userRoute.post("/login", loginUser);

// Update user profile
userRoute.put("/profile/:userId", updateUserProfile);

// Get user by ID
userRoute.get("/:userId", getUserById);

// Delete a user

// Create system notification
userRoute.post("/notifications", createSystemNotification);

// Get system notifications
userRoute.get("/:userId/notifications", getSystemNotifications);

// Update user password
userRoute.put("/password/:userId", updatePassword);

// Toggle account status
userRoute.put("/status/:userId", toggleAccountStatus);

// Resend verification email
userRoute.post("/resend-verification", resendVerificationEmail);

// Get all users (admin only)
userRoute.get("/", getAllUsers);

export default userRoute;
