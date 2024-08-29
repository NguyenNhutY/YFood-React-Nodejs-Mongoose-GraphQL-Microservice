import express, { Request, Response, NextFunction } from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryCount,
} from "../controllers/categoriesController";

// Create a new Express Router
const router = express.Router();

// Define types for the request and response handlers

// Route to get all categories
router.get("/categories", () => getAllCategories(req, res, next));

// Route to get a category by ID
router.get("/categories/:id", () => getCategoryById(req, res, next));

// Route to create a new category
router.post("/categories", () => createCategory(req, res, next));

// Route to update a category by ID
router.put("/categories/:id", () => updateCategory(req, res, next));

// Route to delete a category by ID
router.delete("/categories/:id", () => deleteCategory(req, res, next));

// Route to get the count of categories
router.get("/categories/count", () => getCategoryCount(req, res, next));

export default router;
