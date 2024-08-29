import User from "../data/models/userModel";
import Notification from "../data/models/notificationModel"; // Assuming you have a Notification model
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { Request, Response } from "express";
import "dotenv/config";

interface RegisterRequestBody {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

interface ResetPasswordRequestBody {
  newPassword: string;
  confirmPassword: string;
}

interface UpdateUserRequestBody {
  address?: string;
  phone?: string;
}

interface UpdatePasswordRequestBody {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ToggleAccountStatusRequestBody {
  userId: string;
  status: boolean;
}

interface ResendVerificationEmailRequestBody {
  email: string;
}

interface CreateSystemNotificationRequestBody {
  title: string;
  message: string;
  recipient: string;
}

interface UpdateUserProfileRequestBody {
  userId: string;
  username?: string;
  avatar?: string;
  gender?: string;
  birthDate?: string;
  address?: string;
  phone?: string;
  email?: string;
}

interface UserProfileRequestBody {
  userId: string;
  username?: string;
  avatar?: string;
  gender?: string;
  birthDate?: string;
  address?: string;
  phone?: string;
  email?: string;
}

const isValidPassword = (password: string): boolean => {
  const minLength = validator.isLength(password, { min: 8, max: 100 });
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar
  );
};

const createToken = (email: string): string => {
  return jwt.sign({ email }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
    algorithm: "HS256",
    subject: "User Registration",
  });
};

// Register user
const registerUser = async (req: Request, res: Response) => {
  const { email, password, confirmPassword, username }: RegisterRequestBody =
    req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already in use" });
    }

    if (!validator.isLength(username, { min: 3, max: 50 })) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid username min 3 max 50" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }
    if (!isValidPassword(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be between 8 and 100 characters, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      });
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      username,
    });

    await newUser.save();

    const token = createToken(newUser.email);
    res.json({ success: true, token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Login user
const loginUser = async (req: Request, res: Response) => {
  const { email, password }: LoginRequestBody = req.body;

  try {
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User doesn't exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }
    const token = createToken(user.email);
    res.json({ success: true, token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Verify email
const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({ emailVerificationToken: token });
    if (!user || user.emailVerificationExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification token",
      });
    }
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();
    res.json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Forgot password
const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      to: user.email,
      from: "noreply@example.com",
      subject: "Password Reset",
      text: `You requested a password reset. Please click the following link to reset your password: \n\n
          ${process.env.CLIENT_URL}/reset/${resetToken} \n\n
          If you did not request a password reset, please ignore this email.`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Password reset email sent" });
  } catch (error) {
    console.error("Error processing forgot password request:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Reset password
const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { newPassword, confirmPassword }: ResetPasswordRequestBody = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });
    }

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }

    if (!isValidPassword(newPassword)) {
      return res.status(400).json({
        success: false,
        message:
          "New password must be between 8 and 100 characters, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update user profile
const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { address, phone }: UpdateUserRequestBody = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (address) user.address = address;
    if (phone) user.phone = phone;

    await user.save();

    res.json({ success: true, message: "User profile updated successfully" });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Logout (client-side handling)
const logoutUser = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error logging out:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }
    res.json({ success: true, message: "Logged out successfully" });
  });
};

// Update password
const updatePassword = async (req: Request, res: Response) => {
  const {
    oldPassword,
    newPassword,
    confirmPassword,
  }: UpdatePasswordRequestBody = req.body;

  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Old password is incorrect" });
    }

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "New passwords do not match" });
    }

    if (!isValidPassword(newPassword)) {
      return res.status(400).json({
        success: false,
        message:
          "New password must be between 8 and 100 characters, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Toggle user account status (admin only)
const toggleAccountStatus = async (req: Request, res: Response) => {
  const { userId, status }: ToggleAccountStatusRequestBody = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.isActive = status;
    await user.save();

    res.json({
      success: true,
      message: `Account status updated to ${status ? "active" : "inactive"}`,
    });
  } catch (error) {
    console.error("Error toggling account status:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Resend verification email
const resendVerificationEmail = async (req: Request, res: Response) => {
  const { email }: ResendVerificationEmailRequestBody = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.isEmailVerified) {
      return res
        .status(400)
        .json({ success: false, message: "Email is already verified" });
    }

    const token = createToken(user.email);
    // Send verification email logic here...

    res.json({ success: true, message: "Verification email resent" });
  } catch (error) {
    console.error("Error resending verification email:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Create system notification (admin only)
const createSystemNotification = async (req: Request, res: Response) => {
  const { title, message, recipient }: CreateSystemNotificationRequestBody =
    req.body;

  try {
    const notification = new Notification({
      title,
      message,
      recipient,
      createdAt: new Date(),
    });

    await notification.save();

    res.json({ success: true, message: "Notification created successfully" });
  } catch (error) {
    console.error("Error creating system notification:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getSystemNotifications = async (req: Request, res: Response) => {
  const { recipient } = req.query; // Optional filtering by recipient

  try {
    const query: any = {};

    if (recipient) {
      query.recipient = recipient;
    }

    const notifications = await Notification.find(query).sort({
      createdAt: -1,
    });

    res.json({ success: true, notifications });
  } catch (error) {
    console.error("Error fetching system notifications:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// Get user by ID
const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).select("-password"); // Exclude password from results

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update user profile
const updateUserProfile = async (req: Request, res: Response) => {
  const {
    username,
    email,
    phoneNumber,
    address,
  }: UpdateUserProfileRequestBody = req.body;
  const userId = req.userId; // Assuming userId is set from authentication middleware

  try {
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.address = address || user.address;

    await user.save();

    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// Get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password"); // Exclude password from results
    res.json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export {
  registerUser,
  loginUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
  updateUser,
  logoutUser,
  toggleAccountStatus,
  resendVerificationEmail,
  getAllUsers,
  updateUserProfile,
  getUserById,
  createSystemNotification,
  getSystemNotifications,
  updatePassword,
};
