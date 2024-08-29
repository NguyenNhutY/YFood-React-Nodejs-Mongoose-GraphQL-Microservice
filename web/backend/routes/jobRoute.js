import express, { Request, Response, NextFunction } from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  searchJobs,
  getJobsByLocation,
  getJobsByExperience,
  getJobsByDegree,
  getJobsBySkills,
  paginateJobs,
  sortJobs,
  getJobsByCreatedAt,
  getJobsByUpdatedAt,
  getJobsByStatus,
} from "../controllers/jobController";

// Create a new Express Router
const router = express.Router();

// Define types for request parameters
// Job Operations
router.post("/jobs", createJob);
router.get("/jobs", getAllJobn);
router.get("/jobs/:id", getJobById);
router.put("/jobs/:id", updateJob);
router.delete("/jobs/:id", deleteJob);

// Search and Filter
router.get("/jobs/search", searchJobs);
router.get("/jobs/location/:location", getJobsByLocation);
router.get(
  "/jobs/experience/:minExperience/:maxExperience",
  getJobsByExperience
);
router.get("/jobs/degree/:degree", getJobsByDegree);
router.get("/jobs/skills", getJobsBySkills);
router.get("/jobs/paginate", paginateJobs);
router.get("/jobs/sort", sortJobs);
router.get("/jobs/createdAt/:startDate/:endDate", getJobsByCreatedAt);
router.get("/jobs/updatedAt/:startDate/:endDate", getJobsByUpdatedAt);
router.get("/jobs/status/:status", getJobsByStatus);

export default router;
