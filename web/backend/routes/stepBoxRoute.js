import express, { Request, Response, Router } from "express";
import {
  getStepBoxes,
  getStepBoxById,
  createStepBox,
  updateStepBox,
  deleteStepBox,
  getStepBoxByStatus,
  getStepBoxByTitle,
  getStepBoxByDescription,
  searchStepBoxes,
  filterStepBoxes,
  sortStepBoxes,
  getStepBoxByPublishedDate,
  getStepBoxByUpdatedDate,
  getStepBoxByTotalSteps,
  getStepBoxByCompletedSteps,
  getStepBoxByPercentageCompleted,
  getStepBoxByLastCompletedDate,
  getStepBoxByNextStep,
  getStepBoxByPreviousStep,
} from "../controllers/stepBoxController.js";

const router = express.Router();

// CRUD Operations
router.get("/step-boxes", () => getStepBoxes(req, res));
router.get("/step-boxes/:id", () => getStepBoxById(req, res));
router.post("/step-boxes", () => createStepBox(req, res));
router.put("/step-boxes/:id", () => updateStepBox(req, res));
router.delete("/step-boxes/:id", () => deleteStepBox(req, res));

// Filtering and Searching
router.get("/step-boxes/status", () => getStepBoxByStatus(req, res));
router.get("/step-boxes/title", () => getStepBoxByTitle(req, res));
router.get("/step-boxes/description", () => getStepBoxByDescription(req, res));
router.get("/step-boxes/search", () => searchStepBoxes(req, res));
router.get("/step-boxes/filter", () => filterStepBoxes(req, res));
router.get("/step-boxes/sort", () => sortStepBoxes(req, res));

// Date-Based Queries
router.get("/step-boxes/published-date", () =>
  getStepBoxByPublishedDate(req, res)
);
router.get("/step-boxes/updated-date", () => getStepBoxByUpdatedDate(req, res));
router.get("/step-boxes/total-steps", () => getStepBoxByTotalSteps(req, res));
router.get("/step-boxes/completed-steps", () =>
  getStepBoxByCompletedSteps(req, res)
);
router.get("/step-boxes/percentage-completed", () =>
  getStepBoxByPercentageCompleted(req, res)
);
router.get("/step-boxes/last-completed-date", () =>
  getStepBoxByLastCompletedDate(req, res)
);
router.get("/step-boxes/next-step", () => getStepBoxByNextStep(req, res));
router.get("/step-boxes/previous-step", () =>
  getStepBoxByPreviousStep(req, res)
);

export default router;
