import express from "express";
import {
  addPromocode,
  getPromocodes,
  getPromocodeById,
  updatePromocode,
  deletePromocode,
  applyPromocode,
  validatePromocode,
  getUsedPromocodes,
  getExpiredPromocodes,
} from "../controllers/promocodeController.js";
import authMiddleware from "../middlewares/auth.js";

const promocodeRoute = express.Router();

export default promocodeRoute;
