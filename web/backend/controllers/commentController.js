import { Request, Response, NextFunction } from "express";
import CommentModel from "../data/models/commentModel.js";

// Create a new comment

async function createComment() {
  try {
    const comment = new CommentModel(req.body);
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Get all comments

async function getAllComment() {
  try {
    const comments = await CommentModel.find({});
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get comments by postId

async function getCommentsByPostId() {
  try {
    const comments = await CommentModel.find({ postId: req.params.postId });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update a comment

async function updateComment() {
  try {
    const updatedComment = await CommentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json(updatedComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Delete a comment

async function deleteComment() {
  try {
    const deletedComment = await CommentModel.findByIdAndDelete(req.params.id);
    if (!deletedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json(deletedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get a comment by id

async function getCommentById() {
  try {
    const comment = await CommentModel.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get comment count by postId

async function getCommentCountByPostId() {
  try {
    const commentCount = await CommentModel.countDocuments({
      postId: req.params.postId,
    });
    res.json({ commentCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get average rating by postId

async function getAverageRatingByPostId() {
  try {
    const averageRating = await CommentModel.aggregate([
      {
        $match: { postId: req.params.postId },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);
    res.json(averageRating[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get top commenters by postId

async function getTopCommentersByPostId() {
  try {
    const topCommenters = await CommentModel.aggregate([
      {
        $match: { postId: req.params.postId },
      },
      {
        $group: {
          _id: "$commenterId",
          commentCount: { $sum: 1 },
        },
      },
      {
        $sort: { commentCount: -1 },
      },
      {
        $limit: 3,
      },
    ]);
    res.json(topCommenters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get recent comments by postId

async function getRecentCommentsByPostId() {
  try {
    const recentComments = await CommentModel.find({
      postId: req.params.postId,
    })
      .sort({ createdAt: -1 })
      .limit(5);
    res.json(recentComments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get popular comments by postId

async function getPopularCommentsByPostId() {
  try {
    const popularComments = await CommentModel.find({
      postId: req.params.postId,
    })
      .sort({ likes: -1, comments: -1 })
      .limit(5);
    res.json(popularComments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get top rated comments by postId

async function getTopRatedCommentsByPostId() {
  try {
    const topRatedComments = await CommentModel.find({
      postId: req.params.postId,
    })
      .sort({ rating: -1 })
      .limit(5);
    res.json(topRatedComments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get commenters by postId and rating

async function getCommentersByPostIdAndRating() {
  try {
    const commenters = await CommentModel.aggregate([
      {
        $match: { postId: req.params.postId },
      },
      {
        $group: {
          _id: "$commenterId",
          averageRating: { $avg: "$rating" },
        },
      },
      {
        $sort: { averageRating: -1 },
      },
    ]);
    res.json(commenters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get commenters by postId and comment count

async function getCommentersByPostIdAndCommentCount() {
  try {
    const commenters = await CommentModel.aggregate([
      {
        $match: { postId: req.params.postId },
      },
      {
        $group: {
          _id: "$commenterId",
          commentCount: { $sum: 1 },
        },
      },
      {
        $sort: { commentCount: -1 },
      },
    ]);
    res.json(commenters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get commenters by postId and average rating

async function getCommentersByPostIdAndAverageRating() {
  try {
    const commenters = await CommentModel.aggregate([
      {
        $match: { postId: req.params.postId },
      },
      {
        $group: {
          _id: "$commenterId",
          averageRating: { $avg: "$rating" },
        },
      },
      {
        $sort: { averageRating: -1 },
      },
    ]);
    res.json(commenters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get commenters by postId and last comment date

async function getCommentersByPostIdAndLastCommentDate() {
  try {
    const commenters = await CommentModel.aggregate([
      {
        $match: { postId: req.params.postId },
      },
      {
        $group: {
          _id: "$commenterId",
          lastCommentDate: { $max: "$createdAt" },
        },
      },
      {
        $sort: { lastCommentDate: -1 },
      },
    ]);
    res.json(commenters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get commenters by postId and most recent comment date

async function getCommentersByPostIdAndMostRecentCommentDate() {
  try {
    const commenters = await CommentModel.aggregate([
      {
        $match: { postId: req.params.postId },
      },
      {
        $group: {
          _id: "$commenterId",
          mostRecentCommentDate: { $min: "$createdAt" },
        },
      },
      {
        $sort: { mostRecentCommentDate: -1 },
      },
    ]);
    res.json(commenters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get commenters by postId and total comment count

async function getCommentersByPostIdAndTotalCommentCount() {
  try {
    const commenters = await CommentModel.aggregate([
      {
        $match: { postId: req.params.postId },
      },
      {
        $group: {
          _id: "$commenterId",
          totalCommentCount: { $sum: 1 },
        },
      },
      {
        $sort: { totalCommentCount: -1 },
      },
    ]);
    res.json(commenters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get commenters by postId and average comment length

async function getCommentersByPostIdAndAverageCommentLength() {
  try {
    const commenters = await CommentModel.aggregate([
      {
        $match: { postId: req.params.postId },
      },
      {
        $group: {
          _id: "$commenterId",
          averageCommentLength: { $avg: { $strLenCP: "$comment" } },
        },
      },
      {
        $sort: { averageCommentLength: -1 },
      },
    ]);
    res.json(commenters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get commenters by postId and most commented comment

async function getCommentersByPostIdAndMostCommentedComment() {
  try {
    const commenters = await CommentModel.aggregate([
      {
        $match: { postId: req.params.postId },
      },
      {
        $group: {
          _id: "$commenterId",
          mostCommentedComment: {
            $max: {
              $size: "$comments",
            },
          },
        },
      },
      {
        $sort: { mostCommentedComment: -1 },
      },
    ]);
    res.json(commenters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get commenters by postId and least commented comment

async function getCommentersByPostIdAndLeastCommentedComment() {
  try {
    const commenters = await CommentModel.aggregate([
      {
        $match: { postId: req.params.postId },
      },
      {
        $group: {
          _id: "$commenterId",
          leastCommentedComment: {
            $min: {
              $size: "$comments",
            },
          },
        },
      },
      {
        $sort: { leastCommentedComment: 1 },
      },
    ]);
    res.json(commenters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get commenters by postId and total comment length

async function getCommentersByPostIdAndTotalCommentLength() {
  try {
    const commenters = await CommentModel.aggregate([
      {
        $match: { postId: req.params.postId },
      },
      {
        $group: {
          _id: "$commenterId",
          totalCommentLength: { $sum: { $strLenCP: "$comment" } },
        },
      },
      {
        $sort: { totalCommentLength: -1 },
      },
    ]);
    res.json(commenters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export {
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
};
