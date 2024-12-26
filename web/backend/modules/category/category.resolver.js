import Category from "./category.model.js"
import Food from "../food/food.model.js"
import { ApolloError } from "apollo-server-express"; // Đừng quên import ApolloError

const categoryResolver = {
    Query: {
        listCategory: async (_, { filter }) => {
            try {
              let query = {};
              if (filter) {
                if (filter.name) {
                  query.name = { $regex: filter.name, $options: 'i' }; // Tìm kiếm không phân biệt chữ hoa chữ thường
                }
              }
              const categories = await Category.find(query);
              return {
                success: true,
                message: "Categories retrieved successfully",
                datas: categories,
              };
            } catch (error) {
              console.error("Error retrieving categories:", error);
              throw new ApolloError("Error retrieving categories");
            }
        },
        getCategoryById: async (_, { _id }) => {
            try{
                const result = await Category.findById({_id:_id})
                if (!result){
                    throw new ApolloError("Category not found")
                }
                return {
                    datas:result,
                    success:true,
                    message: "List category successfully"
                }
               }catch(err){
                throw new ApolloError("Error fetching category", "INTERNAL_ERROR")
     
               }
        },
        getCategoryByName: async (_, { name }) => {
            try{
                const result = await Category.findOne({name:name})
                if (!result){
                    throw new ApolloError("Category not found")
                }
                return {
                    datas:result,
                    success:true,
                    message: "List category successfully"
                }
               }catch(err){
                throw new ApolloError("Error fetching category", "INTERNAL_ERROR")
     
               }
        },
        getCategoryByFoodName: async (_, { name }) => {
            try{
                const food = await Food.findOne({name:name})
                if (!food){
                    throw new ApolloError("Category not found")
                }
                const result = await Category.findById({_id:food.category_id})
                if (!result){
                    
                return {
                    datas:result,
                    success:true,
                    message: "List category successfully"
                }
               }
            }catch(err){
                throw new ApolloError("Error fetching category", "INTERNAL_ERROR")
     
               
        }      
    },
         getCategoryByFoodId: async (_, { _id }) => {
            try{
                const food = await Food.findByID({_id:_id})
                if (!food){
                    throw new ApolloError("Food not found")
                }
                const result = await Category.findById({_id:food.category_id})
                if (!result){
                    throw new ApolloError("Category not found")
                }
                return {
                    datas:result,
                    success:true,
                    message: "List category successfully"
                }
               }catch(err){
                throw new ApolloError("Error fetching category", "INTERNAL_ERROR")
     
               }
        },
    },
    Mutation: {
        addCategory: async (_, { name, image }) => {
            const newCategory = new Category({ name, image })
            await newCategory.save()
            return newCategory
        },
        updateCategory: async (_, {name, image }) => {
            try {
                // Tạo một object chỉ chứa các giá trị cần cập nhật
                const updateData = {};
                if (name !== undefined) updateData.name = name;
                if (image !== undefined) updateData.image = image;
        
                // Kiểm tra nếu không có trường nào để cập nhật
                if (Object.keys(updateData).length === 0) {
                    return {
                        success: false,
                        message: "No fields to update",
                        datas: null,
                    };
                }
        
                // Cập nhật category
                const category = await Category.findOne({name});
                if (!category) {
                    return {
                        success: false,
                        message: "Category not found",
                        datas: null,
                    };
                }else{
                    category.name = name;
                    category.image = image;
                    return {
                        data: category,
                        success: true,
                        message: "Category updated successfully",
                    };
                }
            } catch (error) {
                console.error(error);
                return {
                    success: false,
                    message: "Error updating category",
                    datas: null,
                };
            }
        },
        
        deleteCategory: async (_, { id }) => {
            await Category.findByIdAndDelete(id)
            return{
                success: true,
                message: "Category deleted successfully"
            }
        }
    },

}
    

export default categoryResolver;