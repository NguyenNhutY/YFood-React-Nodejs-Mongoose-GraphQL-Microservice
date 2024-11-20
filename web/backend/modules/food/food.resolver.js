// resolvers.js
import Food from "./food.model.js";
import { ApolloError } from "apollo-server-express"; // Đừng quên import ApolloError
import Food from "./food_model.js";
import Category from "../category/category.model.js";
import Material from "../material/material.model.js";
import Material_Batch from "../material_batch/material_batch.model.js";


const foodResolver = {
  Query: {
    listFood:async (_,{}) => {
      try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods, mesage:"List Food Successly" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error" });
      }
    },
    searchFood: async (_, { searchQuery }) => {
      try {
        const foods = await Food.find({ name: { $regex: searchQuery, $options: "i" } });
        return { success: true, data: foods };
      } catch (error) {
        throw new ApolloError("Failed to search foods");
      }},
     getFoodById : async (_,{_id}) => {
        try {
          const food = await Food.findById(_id);
          if (food) {
            return {
                success: true,
                data: food,
                message: "Get Food By ID successfully"
              };
           }
           else {
            throw new ApolloError("Food not found");
          }
        } catch (error) {
          throw new ApolloError("Failed to fetch food");
        
        }
      },
      
    getFoodByCategory : async () => {
        try {
          const foods = await Categories.find({  });
          res.json({ success: true, data: foods });
        } catch (error) {
          console.error(error);
          res.status(500).json({ success: false, message: "Error" });
        }
      },
  },
  Mutation: {

      addMultipleFoods: async (_, { foods }) => {
        // Kiểm tra danh sách thực phẩm
        const invalidFoods = Food.filter((food) => {
          return (
            !food._id ||
            !food.name ||
            !food.price ||
            !food.description
          );
        });
  
        if (invalidFoods.length > 0) {
          throw new Error(
            `Invalid food items: ${invalidFoods.map((f) => f.name || "unknown").join(", ")}`
          );
        }
  
        try {
          // Lưu thực phẩm vào cơ sở dữ liệu
          const foodPromises = foods.map((foodData) => {
            const food = new FoodModel({
              _id: foodData._id,
              name: foodData.name,
              description: foodData.description,
              price: foodData.price,
            });
            return food.save();
          });
          const savedFoods = await Promise.all(foodPromises); // Thực hiện lưu đồng thời
          return savedFoods;
        } catch (error) {
          console.error("Error adding foods:", error);
          throw new Error("Failed to add foods");
        }
      },
    
      

    removeFood : async () => {
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
      },
      
    updateFood : async () => {
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
      },
      
      
    searchFood : async () => {
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
      },
      
 countFood : async () => {
        try {
          const count = await foodModel.countDocuments({});
          res.json({ success: true, count });
        } catch (error) {
          console.error(error);
          res.status(500).json({ success: false, message: "Server error" });
        }
      },
      
    averageFood : async () => {
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
      },
      
    groupedFood : async () => {
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
      },
      
      filterFood : async () => {
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
      },
      
    sortFood : async () => {
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
      },
      
    paginateFood : async () => {
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
      },
      
    recommendFood : async () => {
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
      }
  }
}

export default foodResolver;
