import express, { Request, Response } from "express";
import {
  getAllMaterials,
  getMaterialById,
  addMaterial,
  updateMaterial,
  deleteMaterial,
  getMaterialsByCategory,
  getMaterialsBySupplier,
  searchMaterialsByTitle,
  getRecentlyAddedMaterials,
  getMaterialsInStock,
  getMaterialsOutofStock,
  getMaterialsByPriceRange,
  getMaterialsByQuantityRange,
} from "../controllers/materialController";

const router = express.Router();

// Define route handlers with appropriate type annotations
router.get("/materials", async () => {
  await getAllMaterials(req, res);
});

router.get("/materials/:id", async () => {
  await getMaterialById(req, res);
});

router.post("/materials", async () => {
  await addMaterial(req, res);
});

router.put("/materials/:id", async () => {
  await updateMaterial(req, res);
});

router.delete("/materials/:id", async () => {
  await deleteMaterial(req, res);
});

router.get("/materials/category/:category", async () => {
  await getMaterialsByCategory(req, res);
});

router.get("/materials/supplier/:supplier", async () => {
  await getMaterialsBySupplier(req, res);
});

router.get("/materials/search", async () => {
  await searchMaterialsByTitle(req, res);
});

router.get("/materials/recent", async () => {
  await getRecentlyAddedMaterials(req, res);
});

router.get("/materials/in-stock", async () => {
  await getMaterialsInStock(req, res);
});

router.get("/materials/out-of-stock", async () => {
  await getMaterialsOutofStock(req, res);
});

router.get("/materials/price-range", async () => {
  await getMaterialsByPriceRange(req, res);
});

router.get("/materials/quantity-range", async () => {
  await getMaterialsByQuantityRange(req, res);
});

export default router;
