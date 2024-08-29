import express, { Request, Response, NextFunction } from "express";
import {
  getStocks,
  getStockById,
  createStock,
  updateStock,
  deleteStock,
  searchStock,
  getStockByCategory,
  getStockByLocation,
  getStockBySupplier,
  getLowStock,
  getTopSelling,
  getBestSeller,
  getRecentlyUpdated,
  getStockByDate,
  getStockByBarcode,
  getLowStockByDate,
  getTopSellingByDate,
  getBestSellerByDate,
  getRecentlyUpdatedByDate,
  getStockByCategoryAndDate,
  getStockByLocationAndDate,
  getStockBySupplierAndDate,
  getLowStockByCategoryAndDate,
  getTopSellingByCategoryAndDate,
  getBestSellerByCategoryAndDate,
  getRecentlyUpdatedByCategoryAndDate,
  getStockByLocationAndCategory,
  getStockBySupplierAndCategory,
  getLowStockByLocationAndDate,
} from "../controllers/stockController";

// Create a new Express Router
const router = express.Router();

// Define types for request parameters

// Define types for the request and response handlers

// CRUD Operations
router.get("/", getStocks);
router.get("/:id", getStockById);
router.post("/", createStock);
router.put("/:id", updateStock);
router.delete("/:id", deleteStock);

// Search and Filter
router.get("/search", searchStock);
router.get("/category", getStockByCategory);
router.get("/location", getStockByLocation);
router.get("/supplier", getStockBySupplier);
router.get("/low-stock", getLowStock);
router.get("/top-selling", getTopSelling);
router.get("/best-seller", getBestSeller);
router.get("/recently-updated", getRecentlyUpdated);

// Date-Based Queries
router.get("/date", getStockByDate);
router.get("/barcode", getStockByBarcode);
router.get("/low-stock/date", getLowStockByDate);
router.get("/top-selling/date", getTopSellingByDate);
router.get("/best-seller/date", getBestSellerByDate);
router.get("/recently-updated/date", getRecentlyUpdatedByDate);

// Category and Date-Based Queries
router.get("/category/date", getStockByCategoryAndDate);
router.get("/location/date", getStockByLocationAndDate);
router.get("/supplier/date", getStockBySupplierAndDate);
router.get("/low-stock/category/date", getLowStockByCategoryAndDate);
router.get("/top-selling/category/date", getTopSellingByCategoryAndDate);
router.get("/best-seller/category/date", getBestSellerByCategoryAndDate);
router.get(
  "/recently-updated/category/date",
  getRecentlyUpdatedByCategoryAndDate
);

// Location and Category Queries
router.get("/location/category", getStockByLocationAndCategory);
router.get("/supplier/category", getStockBySupplierAndCategory);
router.get("/low-stock/location/date", getLowStockByLocationAndDate);

export default router;
