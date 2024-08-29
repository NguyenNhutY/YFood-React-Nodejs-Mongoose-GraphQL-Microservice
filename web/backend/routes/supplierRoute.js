import express from "express";
import {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  searchSuppliers,
  getSupplierOrders,
  getSupplierInventory,
  getSupplierReviews,
  getSupplierRatings,
  getSupplierStats,
  getSupplierRecommendations,
  getSupplierByEmail,
  getSupplierByPhone,
  getSupplierByAddress,
  getSupplierByStatus,
  getSupplierByCreatedAt,
  getSupplierByUpdatedAt,
  getSupplierByDeletedAt,
  getSupplierByEmailVerifiedAt,
  getSupplierByPhoneVerifiedAt,
  getSupplierByAddressVerifiedAt,
  getSupplierByCategoryVerifiedAt,
  getSupplierByTagsVerifiedAt,
  getSupplierByStatusVerifiedAt,
  getSupplierByCreatedAtVerifiedAt,
  getSupplierByUpdatedAtVerifiedAt,
  getSupplierByDeletedAtVerifiedAt,
  getSupplierByEmailUnverifiedAt,
} from "../controllers/supplierController.js";
import authMiddleware from "../middlewares/auth.js";

const supplierRoute = express.Router();

// Middleware
supplierRoute.use(authMiddleware);

// Get all suppliers
supplierRoute.get("/", getSuppliers);

// Get supplier by ID
supplierRoute.get("/:id", getSupplierById);

// Create a new supplier
supplierRoute.post("/", createSupplier);

// Update an existing supplier
supplierRoute.put("/:id", updateSupplier);

// Delete a supplier
supplierRoute.delete("/:id", deleteSupplier);

// Search suppliers
supplierRoute.get("/search", searchSuppliers);

// Supplier-specific routes
supplierRoute.get("/:id/orders", getSupplierOrders);
supplierRoute.get("/:id/inventory", getSupplierInventory);
supplierRoute.get("/:id/reviews", getSupplierReviews);
supplierRoute.get("/:id/ratings", getSupplierRatings);
supplierRoute.get("/:id/stats", getSupplierStats);
supplierRoute.get("/:id/recommendations", getSupplierRecommendations);

// Filtering routes
supplierRoute.get("/email/:email", getSupplierByEmail);
supplierRoute.get("/phone/:phone", getSupplierByPhone);
supplierRoute.get("/address/:address", getSupplierByAddress);
supplierRoute.get("/status/:status", getSupplierByStatus);
supplierRoute.get("/created-at/:date", getSupplierByCreatedAt);
supplierRoute.get("/updated-at/:date", getSupplierByUpdatedAt);
supplierRoute.get("/deleted-at/:date", getSupplierByDeletedAt);
supplierRoute.get("/email-verified-at/:date", getSupplierByEmailVerifiedAt);
supplierRoute.get("/phone-verified-at/:date", getSupplierByPhoneVerifiedAt);
supplierRoute.get("/address-verified-at/:date", getSupplierByAddressVerifiedAt);
supplierRoute.get(
  "/category-verified-at/:date",
  getSupplierByCategoryVerifiedAt
);
supplierRoute.get("/tags-verified-at/:date", getSupplierByTagsVerifiedAt);
supplierRoute.get("/status-verified-at/:date", getSupplierByStatusVerifiedAt);
supplierRoute.get(
  "/created-at-verified-at/:date",
  getSupplierByCreatedAtVerifiedAt
);
supplierRoute.get(
  "/updated-at-verified-at/:date",
  getSupplierByUpdatedAtVerifiedAt
);
supplierRoute.get(
  "/deleted-at-verified-at/:date",
  getSupplierByDeletedAtVerifiedAt
);
supplierRoute.get("/email-unverified-at/:date", getSupplierByEmailUnverifiedAt);

export default supplierRoute;
