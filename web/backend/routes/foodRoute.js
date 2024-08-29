import express, { Request, Response } from "express";
import multer, { StorageEngine } from "multer";
import {
  addFood,
  listFood,
  removeFood,
  searchFood,
  updateFood,
  getFoodById,
  getFoodByCategory,
  countFood,
  averageFood,
  groupedFood,
  filterFood,
  sortFood,
  paginateFood,
  recommendFood,
} from "../controllers/foodController";

// Define the interface for the request with the file

const foodRoute = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage });

// Define the routes with types
foodRoute.route("/add").post(upload.single("image"), () => addFood(req, res));
foodRoute.route("/").get(() => listFood(req, res));
foodRoute.route("/paginate").get(() => paginateFood(req, res));
foodRoute.route("/search").post(() => searchFood(req, res));
foodRoute
  .route("/:id")
  .get(() => getFoodById(req, res))
  .put(upload.single("image"), () => updateFood(req, res))
  .delete(() => removeFood(req, res));
foodRoute.route("/category/:category").get(() => getFoodByCategory(req, res));
foodRoute.route("/count").get(() => countFood(req, res));
foodRoute.route("/average").get(() => averageFood(req, res));
foodRoute.route("/grouped").get(() => groupedFood(req, res));
foodRoute.route("/filter").get(() => filterFood(req, res));
foodRoute.route("/sort").get(() => sortFood(req, res));
foodRoute.route("/recommend").get(() => recommendFood(req, res));

export default foodRoute;
