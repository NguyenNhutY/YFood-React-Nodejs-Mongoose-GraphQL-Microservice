import express, { Request, Response, NextFunction } from "express";
import {
  addPromocode,
  getPromocodes,
  getPromocodeById,
  updatePromocode,
  deletePromocode,
  applyPromocode,
  validatePromocode,
  getUsedPromocodes,
  getExpiredPromocodes
} from "../controllers/promocodeController";
import authMiddleware from "../middlewares/auth";

const promocodeRoute = express.Router();

// Apply the middleware
promocodeRoute.use(authMiddleware);

// Define request handlers with TypeScript types
promocodeRoute.post("/promocodes", (req: Request, res: Response, next: NextFunction) => {
  addPromocode(req, res);
});

promocodeRoute.get("/promocodes", (req: Request, res: Response, next: NextFunction) => {
  getPromocodes(req, res);
});

promocodeRoute.get("/promocodes/:id", (req: Request, res: Response, next: NextFunction) => {
  getPromocodeById(req, res);
});

promocodeRoute.put("/promocodes/:id", (req: Request, res: Response, next: NextFunction) => {
  updatePromocode(req, res);
});

promocodeRoute.delete("/promocodes/:id", (req: Request, res: Response, next: NextFunction) => {
  deletePromocode(req, res);
});

promocodeRoute.post("/promocodes/apply", (req: Request, res: Response, next: NextFunction) => {
  applyPromocode(req, res);
});

promocodeRoute.post("/promocodes/validate", (req: Request, res: Response, next: NextFunction) => {
  validatePromocode(req, res);
});

promocodeRoute.get("/promocodes/used", (req: Request, res: Response, next: NextFunction) => {
  getUsedPromocodes(req, res)
});

promocodeRoute.get("/promocodes/expired", (req: Request, res: Response, next: NextFunction) => {
  getExpiredPromocodes(req, res);
});

export default promocodeRoute;
