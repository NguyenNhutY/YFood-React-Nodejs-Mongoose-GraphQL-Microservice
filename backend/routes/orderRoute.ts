import express, { Request, Response, NextFunction } from "express";
import {
  placeOrder,
  verifyOrder,
  userOrders,
  getOrderById,
  getAllOrders,
  getOrderCountByUserId,
  getTotalOrderAmountByUserId,
  getOrderCountByStatus
} from "../controllers/orderController";
import authMiddleware from "../middlewares/auth";

const orderRoute = express.Router();

// Define request handlers with TypeScript types
orderRoute.post("/place", authMiddleware, (req: Request, res: Response, next: NextFunction) => {
  placeOrder(req, res, next);
});

orderRoute.post("/verify", (req: Request, res: Response, next: NextFunction) => {
  verifyOrder(req, res, next);
});

orderRoute.post("/userorders", authMiddleware, (req: Request, res: Response, next: NextFunction) => {
  userOrders(req, res, next);
});

// New routes
orderRoute.get("/orders/:id", authMiddleware, (req: Request, res: Response, next: NextFunction) => {
  getOrderById(req, res, next);
});

orderRoute.get("/orders", authMiddleware, (req: Request, res: Response, next: NextFunction) => {
  getAllOrders(req, res, next);
});

orderRoute.get("/orders/count/:userId", authMiddleware, (req: Request, res: Response, next: NextFunction) => {
  getOrderCountByUserId(req, res, next);
});

orderRoute.get("/orders/total/:userId", authMiddleware, (req: Request, res: Response, next: NextFunction) => {
  getTotalOrderAmountByUserId(req, res, next);
});

orderRoute.get("/orders/status/:status", authMiddleware, (req: Request, res: Response, next: NextFunction) => {
  getOrderCountByStatus(req, res, next);
});

export default orderRoute;
