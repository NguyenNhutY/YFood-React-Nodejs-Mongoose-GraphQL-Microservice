import express, { Request, Response, NextFunction } from "express";
import {
    createFeedback,
    getAllFeedback,
    getFeedbackById,
    updateFeedback,
    deleteFeedback,
    getFeedbacksByUser,
    getFeedbacksByDateRange,
    getFeedbacksByTextContent,
    getFeedbacksByCategory,
    getFeedbacksByTitle,
    getFeedbacksByStatus,
} from "../controllers/feedbackController";

// Create a new Express Router
const router = express.Router();

// Define types for request bodies and query parameters
interface CreateFeedbackBody {
    title: string;
    content: string;
    userId: string;
    category: string;
    status?: string;
}

interface UpdateFeedbackBody {
    title?: string;
    content?: string;
    category?: string;
    status?: string;
}

interface FeedbackQueryParams {
    userId?: string;
    startDate?: string;
    endDate?: string;
    textContent?: string;
    category?: string;
    title?: string;
    status?: string;
}

// Define route handlers
router.post("/feedback", (req: Request<{}, {}, CreateFeedbackBody>, res: Response, next: NextFunction) => {
    createFeedback(req, res, next);
});

router.get("/feedback", (req: Request<{}, {}, {}, FeedbackQueryParams>, res: Response, next: NextFunction) => {
    getAllFeedback(req, res, next);
});

router.get("/feedback/:id", (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    getFeedbackById(req, res, next);
});

router.put("/feedback/:id", (req: Request<{ id: string }, {}, UpdateFeedbackBody>, res: Response, next: NextFunction) => {
    updateFeedback(req, res, next);
});

router.delete("/feedback/:id", (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    deleteFeedback(req, res, next);
});

router.get("/feedback/user/:userId", (req: Request<{ userId: string }>, res: Response, next: NextFunction) => {
    getFeedbacksByUser(req, res, next);
});

router.get("/feedback/date", (req: Request<{}, {}, {}, FeedbackQueryParams>, res: Response, next: NextFunction) => {
    getFeedbacksByDateRange(req, res, next);
});

router.get("/feedback/text", (req: Request<{}, {}, {}, FeedbackQueryParams>, res: Response, next: NextFunction) => {
    getFeedbacksByTextContent(req, res, next);
});

router.get("/feedback/category", (req: Request<{}, {}, {}, FeedbackQueryParams>, res: Response, next: NextFunction) => {
    getFeedbacksByCategory(req, res, next);
});

router.get("/feedback/title", (req: Request<{}, {}, {}, FeedbackQueryParams>, res: Response, next: NextFunction) => {
    getFeedbacksByTitle(req, res, next);
});

router.get("/feedback/status", (req: Request<{}, {}, {}, FeedbackQueryParams>, res: Response, next: NextFunction) => {
    getFeedbacksByStatus(req, res, next);
});

export default router;
