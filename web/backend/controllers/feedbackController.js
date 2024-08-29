import { Request, Response, NextFunction } from "express";
import FeedbackModel from "../data/models/feedbackModel"; // Điều chỉnh đường dẫn nếu cần

// Create a new feedback
export const createFeedback = async (
  req: Request<{}, {}, CreateFeedbackBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const feedback = new FeedbackModel(req.body);
    await feedback.save();
    res.status(201).json({ success: true, data: feedback });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create feedback" });
  }
};

// Get all feedback
export const getAllFeedback = async (
  req: Request<{}, {}, {}, FeedbackQueryParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const feedbacks = await FeedbackModel.find(req.query);
    res.json({ success: true, data: feedbacks });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve feedback" });
  }
};

// Get feedback by ID
export const getFeedbackById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const feedback = await FeedbackModel.findById(req.params.id);
    if (feedback) {
      res.json({ success: true, data: feedback });
    } else {
      res.status(404).json({ success: false, message: "Feedback not found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve feedback" });
  }
};

// Update feedback by ID
export const updateFeedback = async (
  req: Request<{ id: string }, {}, UpdateFeedbackBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const feedback = await FeedbackModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (feedback) {
      res.json({ success: true, data: feedback });
    } else {
      res.status(404).json({ success: false, message: "Feedback not found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update feedback" });
  }
};

// Delete feedback by ID
export const deleteFeedback = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const feedback = await FeedbackModel.findByIdAndDelete(req.params.id);
    if (feedback) {
      res.json({ success: true, message: "Feedback deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Feedback not found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete feedback" });
  }
};

// Get feedbacks by user
export const getFeedbacksByUser = async (
  req: Request<{ userId: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const feedbacks = await FeedbackModel.find({ userId: req.params.userId });
    res.json({ success: true, data: feedbacks });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to retrieve feedbacks by user",
      });
  }
};

// Get feedbacks by date range
export const getFeedbacksByDateRange = async (
  req: Request<{}, {}, {}, FeedbackQueryParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { startDate, endDate } = req.query;
    const feedbacks = await FeedbackModel.find({
      createdAt: {
        $gte: new Date(startDate || 0),
        $lte: new Date(endDate || Date.now()),
      },
    });
    res.json({ success: true, data: feedbacks });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to retrieve feedbacks by date range",
      });
  }
};

// Get feedbacks by text content
export const getFeedbacksByTextContent = async (
  req: Request<{}, {}, {}, FeedbackQueryParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { textContent } = req.query;
    const feedbacks = await FeedbackModel.find({
      content: new RegExp(textContent || "", "i"),
    });
    res.json({ success: true, data: feedbacks });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to retrieve feedbacks by text content",
      });
  }
};

// Get feedbacks by category
export const getFeedbacksByCategory = async (
  req: Request<{}, {}, {}, FeedbackQueryParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { category } = req.query;
    const feedbacks = await FeedbackModel.find({ category });
    res.json({ success: true, data: feedbacks });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to retrieve feedbacks by category",
      });
  }
};

// Get feedbacks by title
export const getFeedbacksByTitle = async (
  req: Request<{}, {}, {}, FeedbackQueryParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title } = req.query;
    const feedbacks = await FeedbackModel.find({
      title: new RegExp(title || "", "i"),
    });
    res.json({ success: true, data: feedbacks });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to retrieve feedbacks by title",
      });
  }
};

// Get feedbacks by status
export const getFeedbacksByStatus = async (
  req: Request<{}, {}, {}, FeedbackQueryParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { status } = req.query;
    const feedbacks = await FeedbackModel.find({ status });
    res.json({ success: true, data: feedbacks });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to retrieve feedbacks by status",
      });
  }
};
