import express, { Request, Response, NextFunction } from 'express';
import multer, { FileFilterCallback } from 'multer';
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
} from '../controllers/foodController';

// Create a new Express Router
const foodRoute = express.Router();

// Set up Multer storage
const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

// Configure Multer
const upload = multer({ storage: storage });

// Define types for the request and response handlers
type HandlerFunction = (req: Request, res: Response, next: NextFunction) => void;

// Food Routes
foodRoute.post('/add', upload.single('image'), addFood as HandlerFunction);
foodRoute.get('/', listFood as HandlerFunction);
foodRoute.get('/paginate', paginateFood as HandlerFunction);
foodRoute.post('/search', searchFood as HandlerFunction);
foodRoute
  .route('/:id')
  .get(getFoodById as HandlerFunction)
  .put(upload.single('image'), updateFood as HandlerFunction)
  .delete(removeFood as HandlerFunction);
foodRoute.get('/category/:category', getFoodByCategory as HandlerFunction);
foodRoute.get('/count', countFood as HandlerFunction);
foodRoute.get('/average', averageFood as HandlerFunction);
foodRoute.get('/grouped', groupedFood as HandlerFunction);
foodRoute.get('/filter', filterFood as HandlerFunction);
foodRoute.get('/sort', sortFood as HandlerFunction);
foodRoute.get('/recommend', recommendFood as HandlerFunction);

export default foodRoute;
