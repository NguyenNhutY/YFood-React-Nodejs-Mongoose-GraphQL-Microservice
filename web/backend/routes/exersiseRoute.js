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
} from "../controllers/exerciseController";

// Create a new Express Router
const router = express.Router();

//
// Route to create a new exercise
router.post("/exercises", createExercise);

// Route to get all exercises
router.get("/exercises", getAllExercises);

// Route to get an exercise by ID
router.get("/exercises/:id", getExerciseById);

// Route to update an exercise by ID
router.put("/exercises/:id", updateExercise);

// Route to delete an exercise by ID
router.delete("/exercises/:id", deleteExercise);

// Route to get exercises by category
router.get("/exercises/category/:category", getExercisesByCategory);

// Route to search exercises
router.get("/exercises/search", searchExercises);

// Route to paginate exercises
router.get("/exercises/paginate", paginateExercises);

// Route to get exercises by date range
router.get("/exercises/date/:startDate/:endDate", getExercisesByDate);

// Route to get exercises by duration range
router.get(
  "/exercises/duration/:minDuration/:maxDuration",
  getExercisesByDuration
);

// Route to get exercises by calories burned range
router.get(
  "/exercises/calories/:minCalories/:maxCalories",
  getExercisesByCaloriesBurned
);

// Route to get exercises by resting time range
router.get(
  "/exercises/resting-time/:minRestingTime/:maxRestingTime",
  getExercisesByRestingTime
);

export default router;
