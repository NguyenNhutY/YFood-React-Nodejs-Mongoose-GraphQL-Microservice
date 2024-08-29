import express, { Request, Response, NextFunction } from "express";
import {
  addBlog,
  getBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
  likeBlogPost,
  dislikeBlogPost,
  getPopularBlogPosts,
  getBlogPostsByAuthor,
  paginateBlog,
  searchBlog,
  addComment,
} from "../controllers/blogController";

// Create a new Express Router
const blogRoute = express.Router();

// Define types for the request and response handlers

// Route to create a new blog post
blogRoute.post("/add", () => addBlog(req, res, next));

// Route to get all blog posts with pagination
blogRoute.get("/paginate", () => paginateBlog(req, res, next));

// Route to add a comment to a blog post
blogRoute.post("/:id/comments", () => addComment(req, res, next));

// Route to get all blog posts
blogRoute.get("/", () => getBlogPosts(req, res, next));

// Route to get a blog post by ID
blogRoute.get("/:id", () => getBlogPostById(req, res, next));

// Route to update a blog post
blogRoute.put("/:id", () => updateBlogPost(req, res, next));

// Route to delete a blog post
blogRoute.delete("/:id", () => deleteBlogPost(req, res, next));

// Route to like a blog post
blogRoute.post("/:id/like", () => likeBlogPost(req, res, next));

// Route to dislike a blog post
blogRoute.post("/:id/dislike", () => dislikeBlogPost(req, res, next));

// Route to get popular blog posts
blogRoute.get("/popular", () => getPopularBlogPosts(req, res, next));

// Route to get blog posts by author
blogRoute.get("/author/:author", () => getBlogPostsByAuthor(req, res, next));

// Route to search blog posts
blogRoute.post("/search", () => searchBlog(req, res, next));

export default blogRoute;
