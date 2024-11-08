import { Request, Response } from "express";
import Quiz from "../data/models/quizModel"; // Import your model

export const getAllQuizzes = async () => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getQuizById = async () => {
  const { id } = req.params;
  try {
    const quiz = await Quiz.findById(id);
    if (quiz) {
      res.status(200).json(quiz);
    } else {
      res.status(404).json({ message: "Quiz not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createQuiz = async () => {
  const quizData = req.body;
  try {
    const newQuiz = new Quiz(quizData);
    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateQuiz = async () => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (updatedQuiz) {
      res.status(200).json(updatedQuiz);
    } else {
      res.status(404).json({ message: "Quiz not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteQuiz = async () => {
  const { id } = req.params;
  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(id);
    if (deletedQuiz) {
      res.status(200).json({ message: "Quiz deleted" });
    } else {
      res.status(404).json({ message: "Quiz not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const searchQuiz = async () => {
  const query = req.query;
  try {
    const quizzes = await Quiz.find(query);
    res.status(200).json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getQuizsByScore = async () => {
  const { minScore, maxScore } = req.query;
  try {
    const quizzes = await Quiz.find({
      score: { $gte: minScore, $lte: maxScore },
    });
    res.status(200).json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
