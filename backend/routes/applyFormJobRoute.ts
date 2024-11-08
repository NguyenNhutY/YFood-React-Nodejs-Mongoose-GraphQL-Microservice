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

// Define types for the request and response handlers
type HandlerFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

// Route to create a new apply form job
router.post(
  "/apply-form-jobs",
  (req: Request, res: Response, next: NextFunction) =>
    createApplyFormJob(req, res)
);

// Route to get all apply form jobs
router.get(
  "/apply-form-jobs",
  (req: Request, res: Response, next: NextFunction) =>
    getAllApplyFormJobs(req, res)
);

// Route to get an apply form job by ID
router.get(
  "/apply-form-jobs/:id",
  (req: Request, res: Response, next: NextFunction) =>
    getApplyFormJobById(req, res)
);

// Route to update an apply form job by ID
router.put(
  "/apply-form-jobs/:id",
  (req: Request, res: Response, next: NextFunction) =>
    updateApplyFormJob(req, res)
);

// Route to delete an apply form job by ID
router.delete(
  "/apply-form-jobs/:id",
  (req: Request, res: Response, next: NextFunction) =>
    deleteApplyFormJob(req, res)
);

// Route to get apply form job count by user ID
router.get(
  "/apply-form-jobs/count/:userId",
  (req: Request, res: Response, next: NextFunction) =>
    getApplyFormJobCountByUserId(req, res)
);

// Route to get apply form jobs by job title
router.get(
  "/apply-form-jobs/title/:jobTitle",
  (req: Request, res: Response, next: NextFunction) =>
    getApplyFormJobsByJobTitle(req, res)
);

// Route to get apply form jobs by location
router.get(
  "/apply-form-jobs/location/:location",
  (req: Request, res: Response, next: NextFunction) =>
    getApplyFormJobsByLocation(req, res)
);

// Route to get apply form jobs by salary range
router.get(
  "/apply-form-jobs/salary/:minSalary/:maxSalary",
  (req: Request, res: Response, next: NextFunction) =>
    getApplyFormJobsBySalaryRange(req, res)
);

// Route to get apply form jobs by date posted
router.get(
  "/apply-form-jobs/date/:startDate/:endDate",
  (req: Request, res: Response, next: NextFunction) =>
    getApplyFormJobsByDatePosted(req, res)
);

// Route to get apply form jobs by status
router.get(
  "/apply-form-jobs/status/:status",
  (req: Request, res: Response, next: NextFunction) =>
    getApplyFormJobsByStatus(req, res)
);

export default router;
