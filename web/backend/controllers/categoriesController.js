const CategoriesModel = require("../data/models/categoriesModel");

// Lấy tất cả các danh mục
const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoriesModel.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

// Lấy danh mục theo ID
const getCategoryById = async (req, res) => {
  try {
    const category = await CategoriesModel.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error fetching category", error });
  }
};

// Tạo danh mục mới
const createCategory = async (req, res) => {
  try {
    const newCategory = new CategoriesModel(req.body);
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
};

// Cập nhật danh mục
const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await CategoriesModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error });
  }
};

// Xóa danh mục
const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await CategoriesModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
};

// Lấy số lượng danh mục
const getCategoryCount = async (req, res) => {
  try {
    const count = await CategoriesModel.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: "Error counting categories", error });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryCount,
};
