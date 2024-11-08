import express, { Request, Response, NextFunction } from 'express';
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
} from '../controllers/userController';

// Create a new Express Router
const userRoute = express.Router();

// Define types for the request and response handlers
type HandlerFunction = (req: Request, res: Response, next: NextFunction) => void;

// Register a new user
userRoute.post('/register', registerUser as HandlerFunction);

// Login a user
userRoute.post('/login', loginUser as HandlerFunction);

// Update user profile
userRoute.put('/profile/:userId', updateUserProfile as HandlerFunction);

// Get user by ID
userRoute.get('/:userId', getUserById as HandlerFunction);

// Delete a user
// Add the delete user route if needed

// Create system notification
userRoute.post('/notifications', createSystemNotification as HandlerFunction);

// Get system notifications
userRoute.get('/:userId/notifications', getSystemNotifications as HandlerFunction);

// Update user password
userRoute.put('/password/:userId', updatePassword as HandlerFunction);

// Toggle account status
userRoute.put('/status/:userId', toggleAccountStatus as HandlerFunction);

// Resend verification email
userRoute.post('/resend-verification', resendVerificationEmail as HandlerFunction);

// Get all users (admin only)
userRoute.get('/', getAllUsers as HandlerFunction);

export default userRoute;
