import express, { Request, Response, NextFunction } from "express";
import {
  createExercise,
  getAllExercises,
  getExerciseById,
  updateExercise,
  deleteExercise,
  getExercisesByCategory,
  searchExercises,
  paginateExercises,
  getExercisesByDate,
  getExercisesByDuration,
  getExercisesByCaloriesBurned,
  getExercisesByRestingTime,
} from "../controllers/exerciseController.ts";

// Create a new Express Router
const router = express.Router();

// Define types for the request and response handlers
type HandlerFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

// Route to create a new exercise
router.post("/exercises", createExercise as HandlerFunction);

// Route to get all exercises
router.get("/exercises", getAllExercises as HandlerFunction);

// Route to get an exercise by ID
router.get("/exercises/:id", getExerciseById as HandlerFunction);

// Route to update an exercise by ID
router.put("/exercises/:id", updateExercise as HandlerFunction);

// Route to delete an exercise by ID
router.delete("/exercises/:id", deleteExercise as HandlerFunction);

// Route to get exercises by category
router.get(
  "/exercises/category/:category",
  getExercisesByCategory as HandlerFunction
);

// Route to search exercises
router.get("/exercises/search", searchExercises as HandlerFunction);

// Route to paginate exercises
router.get("/exercises/paginate", paginateExercises as HandlerFunction);

// Route to get exercises by date range
router.get(
  "/exercises/date/:startDate/:endDate",
  getExercisesByDate as HandlerFunction
);

// Route to get exercises by duration range
router.get(
  "/exercises/duration/:minDuration/:maxDuration",
  getExercisesByDuration as HandlerFunction
);

// Route to get exercises by calories burned range
router.get(
  "/exercises/calories/:minCalories/:maxCalories",
  getExercisesByCaloriesBurned as HandlerFunction
);

// Route to get exercises by resting time range
router.get(
  "/exercises/resting-time/:minRestingTime/:maxRestingTime",
  getExercisesByRestingTime as HandlerFunction
);

export default router;
