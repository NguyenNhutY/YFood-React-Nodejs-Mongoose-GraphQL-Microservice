import { Router } from "express";
import {
  getAllWebPages,
  getWebPageById,
  createWebPage,
  updateWebPage,
  deleteWebPage,
} from "../controllers/WebPageController";

const router = Router();

router.get("/webpages", getAllWebPages);
router.get("/webpages/:id", getWebPageById);
router.post("/webpages", createWebPage);
router.put("/webpages/:id", updateWebPage);
router.delete("/webpages/:id", deleteWebPage);

export default router;
