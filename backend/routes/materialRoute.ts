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
} from "../controllers/materialController.ts";

const router = express.Router();

// Define route handlers with appropriate type annotations
router.get("/materials", async (req: Request, res: Response) => {
  await getAllMaterials(req, res);
});

router.get("/materials/:id", async (req: Request, res: Response) => {
  await getMaterialById(req, res);
});

router.post("/materials", async (req: Request, res: Response) => {
  await addMaterial(req, res);
});

router.put("/materials/:id", async (req: Request, res: Response) => {
  await updateMaterial(req, res);
});

router.delete("/materials/:id", async (req: Request, res: Response) => {
  await deleteMaterial(req, res);
});

router.get(
  "/materials/category/:category",
  async (req: Request, res: Response) => {
    await getMaterialsByCategory(req, res);
  }
);

router.get(
  "/materials/supplier/:supplier",
  async (req: Request, res: Response) => {
    await getMaterialsBySupplier(req, res);
  }
);

router.get("/materials/search", async (req: Request, res: Response) => {
  await searchMaterialsByTitle(req, res);
});

router.get("/materials/recent", async (req: Request, res: Response) => {
  await getRecentlyAddedMaterials(req, res);
});

router.get("/materials/in-stock", async (req: Request, res: Response) => {
  await getMaterialsInStock(req, res);
});

router.get("/materials/out-of-stock", async (req: Request, res: Response) => {
  await getMaterialsOutofStock(req, res);
});

router.get("/materials/price-range", async (req: Request, res: Response) => {
  await getMaterialsByPriceRange(req, res);
});

router.get("/materials/quantity-range", async (req: Request, res: Response) => {
  await getMaterialsByQuantityRange(req, res);
});

export default router;
