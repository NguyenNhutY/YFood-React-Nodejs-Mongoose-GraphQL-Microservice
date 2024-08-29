import express, { Request, Response, NextFunction } from "express";
import {
  createComment,
  getCommentsByPostId,
  updateComment,
  deleteComment,
  getCommentById,
  getAllComment,
  getCommentCountByPostId,
  getAverageRatingByPostId,
  getTopCommentersByPostId,
  getRecentCommentsByPostId,
  getPopularCommentsByPostId,
  getTopRatedCommentsByPostId,
  getCommentersByPostIdAndRating,
  getCommentersByPostIdAndCommentCount,
  getCommentersByPostIdAndAverageRating,
  getCommentersByPostIdAndLastCommentDate,
  getCommentersByPostIdAndMostRecentCommentDate,
  getCommentersByPostIdAndTotalCommentCount,
  getCommentersByPostIdAndAverageCommentLength,
  getCommentersByPostIdAndMostCommentedComment,
  getCommentersByPostIdAndLeastCommentedComment,
  getCommentersByPostIdAndTotalCommentLength,
} from "../controllers/commentController"; // Đã bỏ phần mở rộng .ts ở đây

import authMiddleware from "../middlewares/auth";

// Create a new Express Router
const commentRoute = express.Router();

// Define types for the request and response handlers

// Middleware for authentication
commentRoute.use(authMiddleware);

// Comment Routes
commentRoute.post("/comments", (n) => createComment(req, res, next));
commentRoute.get("/comments/post/:postId", () =>
  getCommentsByPostId(req, res, next)
);
commentRoute.put("/comments/:id", () => updateComment(req, res, next));
commentRoute.delete("/comments/:id", () => deleteComment(req, res, next));
commentRoute.get("/comments/:id", () => getCommentById(req, res, next));
commentRoute.get("/comments/all", () => getAllComment(req, res, next));
commentRoute.get("/comments/count/:postId", () =>
  getCommentCountByPostId(req, res, next)
);
commentRoute.get("/comments/average-rating/:postId", () =>
  getAverageRatingByPostId(req, res, next)
);
commentRoute.get("/comments/top-commenters/:postId", () =>
  getTopCommentersByPostId(req, res, next)
);
commentRoute.get("/comments/recent/:postId", () =>
  getRecentCommentsByPostId(req, res, next)
);
commentRoute.get("/comments/popular/:postId", () =>
  getPopularCommentsByPostId(req, res, next)
);
commentRoute.get("/comments/top-rated/:postId", () =>
  getTopRatedCommentsByPostId(req, res, next)
);
commentRoute.get("/comments/commenters/rating/:postId", () =>
  getCommentersByPostIdAndRating(req, res, next)
);
commentRoute.get("/comments/commenters/comment-count/:postId", () =>
  getCommentersByPostIdAndCommentCount(req, res, next)
);
commentRoute.get("/comments/commenters/average-rating/:postId", () =>
  getCommentersByPostIdAndAverageRating(req, res, next)
);
commentRoute.get("/comments/commenters/last-comment-date/:postId", () =>
  getCommentersByPostIdAndLastCommentDate(req, res, next)
);
commentRoute.get("/comments/commenters/most-recent-comment-date/:postId", () =>
  getCommentersByPostIdAndMostRecentCommentDate(req, res, next)
);
commentRoute.get("/comments/commenters/total-comment-count/:postId", () =>
  getCommentersByPostIdAndTotalCommentCount(req, res, next)
);
commentRoute.get("/comments/commenters/average-comment-length/:postId", () =>
  getCommentersByPostIdAndAverageCommentLength(req, res, next)
);
commentRoute.get("/comments/commenters/most-commented-comment/:postId", () =>
  getCommentersByPostIdAndMostCommentedComment(req, res, next)
);
commentRoute.get("/comments/commenters/least-commented-comment/:postId", () =>
  getCommentersByPostIdAndLeastCommentedComment(req, res, next)
);
commentRoute.get("/comments/commenters/total-comment-length/:postId", () =>
  getCommentersByPostIdAndTotalCommentLength(req, res, next)
);

export default commentRoute;
