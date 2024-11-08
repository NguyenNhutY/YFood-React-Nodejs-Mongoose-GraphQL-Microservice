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
type HandlerFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

// Route to get all categories
router.get("/categories", (req: Request, res: Response, next: NextFunction) =>
  getAllCategories(req, res)
);

// Route to get a category by ID
router.get(
  "/categories/:id",
  (req: Request, res: Response, next: NextFunction) =>
    getCategoryById(req, res)
);

// Route to create a new category
router.post("/categories", (req: Request, res: Response, next: NextFunction) =>
  createCategory(req, res)
);

// Route to update a category by ID
router.put(
  "/categories/:id",
  (req: Request, res: Response, next: NextFunction) =>
    updateCategory(req, res)
);

// Route to delete a category by ID
router.delete(
  "/categories/:id",
  (req: Request, res: Response, next: NextFunction) =>
    deleteCategory(req, res)
);

// Route to get the count of categories
router.get(
  "/categories/count",
  (req: Request, res: Response, next: NextFunction) =>
    getCategoryCount(req, res)
);

export default router;
