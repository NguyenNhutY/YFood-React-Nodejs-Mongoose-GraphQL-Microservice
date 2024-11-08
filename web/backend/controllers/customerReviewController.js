import CustomerReviewModel from "../data/models/customerReviewModel.js";

// types.ts

// Định nghĩa kiểu dữ liệu cho các thông tin đánh giá của khách hàng


// Thêm đánh giá của khách hàng
export const addCustomerReview = async (req, res) => {
  try {
    const newReview = new CustomerReviewModel(req.body);
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: "Error adding review", error });
  }
};

// Lấy tất cả các đánh giá của khách hàng
export const getAllCustomerReviews = async (req, res) => {
  try {
    const reviews = await CustomerReviewModel.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
};

// Lấy đánh giá của khách hàng theo ID
export const getCustomerReviewById = async (req, res) => {
  try {
    const review = await CustomerReviewModel.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Error fetching review", error });
  }
};

// Cập nhật đánh giá của khách hàng
export const updateCustomerReview = async (req, res) => {
  try {
    const updatedReview = await CustomerReviewModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: "Error updating review", error });
  }
};
