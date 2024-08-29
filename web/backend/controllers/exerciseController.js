import ExerciseModel from "../data/models/ExerciseModel.js";

// Tạo bài tập mới
export const createExercise = async (req, res) => {
  try {
    const newExercise = new ExerciseModel(req.body);
    await newExercise.save();
    res.status(201).json(newExercise);
  } catch (error) {
    res.status(500).json({ message: "Error creating exercise", error });
  }
};

// Lấy tất cả các bài tập
export const getAllExercises = async (req, res) => {
  try {
    const exercises = await ExerciseModel.find();
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exercises", error });
  }
};

// Lấy bài tập theo ID
export const getExerciseById = async (req, res) => {
  try {
    const exercise = await ExerciseModel.findById(req.params.id);
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }
    res.status(200).json(exercise);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exercise", error });
  }
};

// Cập nhật bài tập
export const updateExercise = async (req, res) => {
  try {
    const updatedExercise = await ExerciseModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedExercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }
    res.status(200).json(updatedExercise);
  } catch (error) {
    res.status(500).json({ message: "Error updating exercise", error });
  }
};

// Xóa bài tập
export const deleteExercise = async (req, res) => {
  try {
    const deletedExercise = await ExerciseModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedExercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }
    res.status(200).json({ message: "Exercise deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting exercise", error });
  }
};

// Lấy các bài tập theo danh mục
export const getExercisesByCategory = async (req, res) => {
  try {
    const exercises = await ExerciseModel.find({
      category: req.params.category,
    });
    res.status(200).json(exercises);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching exercises by category", error });
  }
};

// Tìm kiếm các bài tập
export const searchExercises = async (req, res) => {
  try {
    const { query } = req.query;
    const exercises = await ExerciseModel.find({
      title: new RegExp(query, "i"),
    });
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ message: "Error searching exercises", error });
  }
};

// Phân trang các bài tập
export const paginateExercises = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const exercises = await ExerciseModel.find()
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ message: "Error paginating exercises", error });
  }
};

// Lấy các bài tập theo ngày tạo
export const getExercisesByDate = async (req, res) => {
  try {
    const exercises = await ExerciseModel.find({
      dateCreated: {
        $gte: new Date(req.params.startDate),
        $lte: new Date(req.params.endDate),
      },
    });
    res.status(200).json(exercises);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching exercises by date", error });
  }
};

// Lấy các bài tập theo thời lượng
export const getExercisesByDuration = async (req, res) => {
  try {
    const exercises = await ExerciseModel.find({
      duration: { $gte: req.params.minDuration, $lte: req.params.maxDuration },
    });
    res.status(200).json(exercises);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching exercises by duration", error });
  }
};

// Lấy các bài tập theo lượng calo đốt cháy
export const getExercisesByCaloriesBurned = async (req, res) => {
  try {
    const exercises = await ExerciseModel.find({
      caloriesBurned: {
        $gte: req.params.minCalories,
        $lte: req.params.maxCalories,
      },
    });
    res.status(200).json(exercises);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching exercises by calories burned", error });
  }
};

// Lấy các bài tập theo thời gian nghỉ ngơi
export const getExercisesByRestingTime = async (req, res) => {
  try {
    const exercises = await ExerciseModel.find({
      restingTime: {
        $gte: req.params.minRestingTime,
        $lte: req.params.maxRestingTime,
      },
    });
    res.status(200).json(exercises);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching exercises by resting time", error });
  }
};
export const deleteCustomerReview = async (req, res) => {
  try {
    const review = await CustomerReviewModel.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting review", error });
  }
};

// Lấy đánh giá của khách hàng theo ID người dùng
export const getCustomerReviewsByUserId = async (req, res) => {
  try {
    const reviews = await CustomerReviewModel.find({
      customerId: req.params.userId,
    });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
};

// Lấy đánh giá của khách hàng theo ID sản phẩm
export const getCustomerReviewsByProductId = async (req, res) => {
  try {
    const reviews = await CustomerReviewModel.find({
      productId: req.params.productId,
    });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
};

// Lấy đánh giá của khách hàng theo xếp hạng
export const getCustomerReviewsByRating = async (req, res) => {
  try {
    const reviews = await CustomerReviewModel.find({
      rating: req.params.rating,
    });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
};

// Lấy đánh giá của khách hàng theo ngày
export const getCustomerReviewsByDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const reviews = await CustomerReviewModel.find({
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
};
