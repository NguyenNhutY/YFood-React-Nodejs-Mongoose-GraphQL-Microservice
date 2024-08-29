import express, { Request, Response, NextFunction } from "express";
import {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  searchQuiz,
  getQuizsByScore,
} from "../controllers/quizController";

const router = express.Router();

// Define type for the request and response handlers
const handleGetAllQuizzes = () => {
  getAllQuizzes(req, res);
};

const handleGetQuizById = () => {
  getQuizById(req, res);
};

const handleCreateQuiz = () => {
  createQuiz(req, res);
};
const handleUpdateQuiz = () => {
  updateQuiz(req, res);
};

const handleDeleteQuiz = () => {
  deleteQuiz(req, res);
};

const handleSearchQuiz = () => {
  searchQuiz(req, res);
};

const handleGetQuizsByScore = () => {
  getQuizsByScore(req, res);
};

router.get("/quizzes", handleGetAllQuizzes);
router.get("/quizzes/:id", handleGetQuizById);
router.post("/quizzes", handleCreateQuiz);
router.put("/quizzes/:id", handleUpdateQuiz);
router.delete("/quizzes/:id", handleDeleteQuiz);
router.get("/quizzes/search", handleSearchQuiz);
router.get("/quizzes/score", handleGetQuizsByScore);

export default router;
