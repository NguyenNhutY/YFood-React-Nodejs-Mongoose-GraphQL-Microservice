import { Request, Response } from "express";
import foodModel from "../data/models/foodModel";
import fs from "fs";

const addFood = async () => {
  console.log("Request body:", req.body);
  const foodsArray = req.body;
  if (!Array.isArray(foodsArray) || foodsArray.length === 0) {
    res.status(400).json({
      success: false,
      message: "Invalid input: Expected an array of food objects",
    });
    return;
  }
  try {
    for (const foodData of foodsArray) {
      const {
        name,
        description,
        price,
        category,
        _id,
        image,
        metail_1,
        metail_2,
        metail_3,
      } = foodData;

      if (!_id) {
        res.status(400).json({
          success: false,
          message: "_id is required",
        });
        return;
      }
      if (!name) {
        res.status(400).json({
          success: false,
          message: "Name is required",
        });
        return;
      }
      if (!image) {
        res.status(400).json({
          success: false,
          message: "Image is required",
        });
        return;
      }
      if (!price) {
        res.status(400).json({
          success: false,
          message: "Price is required",
        });
        return;
      }
      if (!description) {
        res.status(400).json({
          success: false,
          message: "Description is required",
        });
        return;
      }
      if (!category) {
        res.status(400).json({
          success: false,
          message: "Category is required",
        });
        return;
      }

      const food = new foodModel({
        _id,
        name,
        description,
        price,
        category,
        image,
        metail_1,
        metail_2,
        metail_3,
      });
      await food.save();
    }
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to save food items" });
  }
};

const listFood = async () => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

const removeFood = async () => {
  try {
    const food = await foodModel.findById(req.body._id);
    if (food?.image) {
      fs.unlinkSync(`uploads/${food.image}`);
    }
    await foodModel.findByIdAndDelete(req.body._id);
    res.json({ success: true, message: "Food deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

const updateFood = async () => {
  try {
    const food = await foodModel.findById(req.body._id);
    if (req.file) {
      if (food?.image) {
        fs.unlinkSync(`uploads/${food.image}`);
      }
      food.image = req.file.filename;
    }
    if (food) {
      food.name = req.body.name ?? food.name;
      food.description = req.body.description ?? food.description;
      food.price = req.body.price ?? food.price;
      food.category = req.body.category ?? food.category;
      food.metail_1 = req.body.metail_1 ?? food.metail_1;
      food.metail_2 = req.body.metail_2 ?? food.metail_2;
      food.metail_3 = req.body.metail_3 ?? food.metail_3;
      await food.save();
      res.json({ success: true, message: "Food updated successfully" });
    } else {
      res.status(404).json({ success: false, message: "Food not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

const getFoodById = async () => {
  try {
    const food = await foodModel.findById(req.params._id);
    if (food) {
      res.json({ success: true, data: food });
    } else {
      res.status(404).json({ success: false, message: "Food not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

const getFoodByCategory = async () => {
  try {
    const foods = await foodModel.find({ category: req.params.category });
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

const searchFood = async () => {
  try {
    const searchQuery = req.query.search || "";
    if (!searchQuery.trim()) {
      res
        .status(400)
        .json({ success: false, message: "Search query cannot be empty" });
      return;
    }
    const foods = await foodModel.find({
      $or: [{ name: { $regex: searchQuery, $options: "i" } }],
    });
    res.status(200).json({ success: true, data: foods });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const countFood = async () => {
  try {
    const count = await foodModel.countDocuments({});
    res.json({ success: true, count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const averageFood = async () => {
  try {
    const result = await foodModel.aggregate([
      {
        $group: {
          _id: null,
          averagePrice: { $avg: "$price" },
        },
      },
    ]);
    res.json({ success: true, averagePrice: result[0]?.averagePrice || 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const groupedFood = async () => {
  try {
    const result = await foodModel.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);
    res.json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const filterFood = async () => {
  const { minPrice, maxPrice, category } = req.query;
  try {
    const query = {};
    if (minPrice) query.price = { $gte: minPrice };
    if (maxPrice) query.price = { ...query.price, $lte: maxPrice };
    if (category) query.category = category;
    const foods = await foodModel.find(query);
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const sortFood = async () => {
  const { sortBy, order } = req.query;
  try {
    const sortOptions = {};
    sortOptions[sortBy ?? ""] = order === "asc" ? 1 : -1;
    const foods = await foodModel.find({}).sort(sortOptions);
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const paginateFood = async () => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const foods = await foodModel.find({}).skip(skip).limit(limit);

    const totalItems = await foodModel.countDocuments({});
    const totalPages = Math.ceil(totalItems / limit);

    res.json({
      success: true,
      data: foods,
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const recommendFood = async () => {
  const { category } = req.query;

  try {
    if (!category) {
      res.status(400).json({
        success: false,
        message: "Category query parameter is required",
      });
      return;
    }

    const recommendations = await foodModel.find({ category }).limit(5); // Limit the number of recommendations

    res.json({
      success: true,
      data: recommendations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export {
  addFood,
  listFood,
  removeFood,
  updateFood,
  getFoodById,
  getFoodByCategory,
  searchFood,
  countFood,
  averageFood,
  groupedFood,
  filterFood,
  sortFood,
  paginateFood,
  recommendFood,
};
