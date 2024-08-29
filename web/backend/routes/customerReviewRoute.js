import express, { Request, Response, NextFunction } from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryCount,
} from "../controllers/categoriesController";

// Define types for the request and response handlers

const router = express.Router();

// Define routes with type assertion for handler functions
router.get("/categories", () => getAllCategories(req, res));
router.get("/categories/:id", () => getCategoryById(req, res));
router.post("/categories", () => createCategory(req, res));
router.put("/categories/:id", () => updateCategory(req, res));
router.delete("/categories/:id", () => deleteCategory(req, res));
router.get("/categories/count", () => getCategoryCount(req, res));

export default router;
