import express, { Request, Response, NextFunction } from "express";
import {
  getAllBranchLocations,
  getBranchLocationById,
  addBranchLocation,
  updateBranchLocation,
  deleteBranchLocation,
  getBranchLocationsByBranchId,
  getBranchLocationsByLocationName,
  getBranchLocationsByAddress,
  getBranchLocationsByPhoneNumber,
  getBranchLocationsByEmail,
  getBranchLocationsByOpeningHours,
  getBranchLocationsByClosingHours,
  getBranchLocationsByWeekdayHours,
  getBranchLocationsByWeekendHours,
  getBranchLocationsByOperatingDays,
  getBranchLocationsByNonOperatingDays,
  getBranchLocationsByMaxCapacity,
  getBranchLocationsByMinCapacity,
  getBranchLocationsByAverageRating,
  getBranchLocationsByTotalReviews,
  getBranchLocationsByDistanceFromStore,
  getBranchLocationsByDistanceFromCustomerCenter,
  getBranchLocationsByDistanceFromOtherStores,
  getBranchLocationsByDistanceFromRestaurants,
  getBranchLocationsByDistanceFromEvents,
  getBranchLocationsByDistanceFrom,
} from "../controllers/branchLocationController";

// Create a new Express Router
const router = express.Router();

// Define types for the request and response handlers

// Route definitions
router.get("/locations", getAllBranchLocations);
router.get("/locations/:id", getBranchLocationById);
router.post("/locations", addBranchLocation);
router.put("/locations/:id", updateBranchLocation);
router.delete("/locations/:id", deleteBranchLocation);

router.get("/locations/branch/:branchId", getBranchLocationsByBranchId);
router.get("/locations/name/:name", getBranchLocationsByLocationName);
router.get("/locations/address/:address", getBranchLocationsByAddress);
router.get("/locations/phone/:phoneNumber", getBranchLocationsByPhoneNumber);
router.get("/locations/email/:email", getBranchLocationsByEmail);
router.get(
  "/locations/opening-hours/:openingHours",
  getBranchLocationsByOpeningHours
);
router.get(
  "/locations/closing-hours/:closingHours",
  getBranchLocationsByClosingHours
);
router.get(
  "/locations/weekday-hours/:weekdayHours",
  getBranchLocationsByWeekdayHours
);
router.get(
  "/locations/weekend-hours/:weekendHours",
  getBranchLocationsByWeekendHours
);
router.get(
  "/locations/operating-days/:operatingDays",
  getBranchLocationsByOperatingDays
);
router.get(
  "/locations/non-operating-days/:nonOperatingDays",
  getBranchLocationsByNonOperatingDays
);
router.get(
  "/locations/max-capacity/:maxCapacity",
  getBranchLocationsByMaxCapacity
);
router.get(
  "/locations/min-capacity/:minCapacity",
  getBranchLocationsByMinCapacity
);
router.get(
  "/locations/average-rating/:averageRating",
  getBranchLocationsByAverageRating
);
router.get(
  "/locations/total-reviews/:totalReviews",
  getBranchLocationsByTotalReviews
);
router.get(
  "/locations/distance-from-store/:distance",
  getBranchLocationsByDistanceFromStore
);
router.get(
  "/locations/distance-from-customer-center/:distance",
  getBranchLocationsByDistanceFromCustomerCenter
);
router.get(
  "/locations/distance-from-other-stores/:distance",
  getBranchLocationsByDistanceFromOtherStores
);
router.get(
  "/locations/distance-from-restaurants/:distance",
  getBranchLocationsByDistanceFromRestaurants
);
router.get(
  "/locations/distance-from-events/:distance",
  getBranchLocationsByDistanceFromEvents
);
router.get(
  "/locations/distance-from/:distance",
  getBranchLocationsByDistanceFrom
);

export default router;
