import express, { Request, Response, NextFunction } from "express";
import {
  getAllMusic,
  getMusicById,
  createMusic,
  updateMusic,
  deleteMusic,
  getMusicByTitle,
  getMusicByPlaylists,
  getMusicByPlaylistsCount,
} from "../controllers/musicController";

// Create a new Express Router
const router = express.Router();

// Define types for request parameters

// Define types for the request and response handlers

// Music Operations
router.get("/music", getAllMusic);
router.get("/music/:id", getMusicById);
router.post("/music", createMusic);
router.put("/music/:id", updateMusic);
router.delete("/music/:id", deleteMusic);

// Search and Filter
router.get("/music/title", getMusicByTitle);
router.get("/music/playlists", getMusicByPlaylists);
router.get("/music/playlists/count", getMusicByPlaylistsCount);

export default router;
