import express, { Request, Response, NextFunction } from "express";
import {
  createApplyFormJob,
  getAllApplyFormJobs,
  getApplyFormJobById,
  updateApplyFormJob,
  deleteApplyFormJob,
  getApplyFormJobCountByUserId,
  getApplyFormJobsByJobTitle,
  getApplyFormJobsByLocation,
  getApplyFormJobsBySalaryRange,
  getApplyFormJobsByDatePosted,
  getApplyFormJobsByStatus,
} from "../controllers/applyFormJobController";

// Create a new Express Router
const router = express.Router();

// Defi
// Route to create a new apply form job
router.post("/apply-form-jobs", () => createApplyFormJob(req, res, next));

// Route to get all apply form jobs
router.get("/apply-form-jobs", () => getAllApplyFormJobs(req, res, next));

// Route to get an apply form job by ID
router.get("/apply-form-jobs/:id", () => getApplyFormJobById(req, res, next));

// Route to update an apply form job by ID
router.put("/apply-form-jobs/:id", () => updateApplyFormJob(req, res, next));

// Route to delete an apply form job by ID
router.delete("/apply-form-jobs/:id", () => deleteApplyFormJob(req, res, next));

// Route to get apply form job count by user ID
router.get("/apply-form-jobs/count/:userId", () =>
  getApplyFormJobCountByUserId(req, res, next)
);

// Route to get apply form jobs by job title
router.get("/apply-form-jobs/title/:jobTitle", () =>
  getApplyFormJobsByJobTitle(req, res, next)
);

// Route to get apply form jobs by location
router.get("/apply-form-jobs/location/:location", () =>
  getApplyFormJobsByLocation(req, res, next)
);

// Route to get apply form jobs by salary range
router.get("/apply-form-jobs/salary/:minSalary/:maxSalary", () =>
  getApplyFormJobsBySalaryRange(req, res, next)
);

// Route to get apply form jobs by date posted
router.get("/apply-form-jobs/date/:startDate/:endDate", () =>
  getApplyFormJobsByDatePosted(req, res, next)
);

// Route to get apply form jobs by status
router.get("/apply-form-jobs/status/:status", () =>
  getApplyFormJobsByStatus(req, res, next)
);

export default router;
