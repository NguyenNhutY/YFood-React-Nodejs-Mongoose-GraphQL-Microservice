// food.service.js
import Food from "./food.model.js";

const FoodService = {
  // Lấy danh sách thực phẩm từ database
  listFood: async () => {
    try {
      const foods = await Food.find();
      return { success: true, message: "Danh sách thực phẩm đã được lấy thành công", data: foods };
    } catch (error) {
      return { success: false, message: "Có lỗi khi lấy danh sách thực phẩm", error: error.message };
    }
  },

  // Lấy thực phẩm theo ID
  getFoodById: async (id) => {
    try {
      const food = await Food.findById(id);
      if (!food) {
        return { success: false, message: "Không tìm thấy thực phẩm với ID này" };
      }
      return { success: true, message: "Lấy thông tin thực phẩm thành công", data: food };
    } catch (error) {
      return { success: false, message: "Có lỗi khi lấy thực phẩm", error: error.message };
    }
  },

  // Lấy thực phẩm theo tên
  getFoodByName: async (name) => {
    try {
      const food = await Food.findOne({ name });
      if (!food) {
        return { success: false, message: "Không tìm thấy thực phẩm với tên này" };
      }
      return { success: true, message: "Lấy thông tin thực phẩm thành công", data: food };
    } catch (error) {
      return { success: false, message: "Có lỗi khi lấy thực phẩm", error: error.message };
    }
  },

  // Tạo mới thực phẩm
  createFood: async ({ name, description, price, category, image }) => {
    try {
      const food = new Food({ name, description, price, category, image });
      await food.save();
      return { success: true, message: "Tạo thực phẩm thành công", data: food };
    } catch (error) {
      return { success: false, message: "Có lỗi khi tạo thực phẩm", error: error.message };
    }
  },

  // Cập nhật thông tin thực phẩm
  updateFood: async (id, updateData) => {
    try {
      const food = await Food.findByIdAndUpdate(id, updateData, { new: true });
      if (!food) {
        return { success: false, message: "Không tìm thấy thực phẩm để cập nhật" };
      }
      return { success: true, message: "Cập nhật thực phẩm thành công", data: food };
    } catch (error) {
      return { success: false, message: "Có lỗi khi cập nhật thực phẩm", error: error.message };
    }
  },

  // Xóa thực phẩm
  deleteFood: async (id) => {
    try {
      const food = await Food.findByIdAndDelete(id);
      if (!food) {
        return { success: false, message: "Không tìm thấy thực phẩm để xóa" };
      }
      return { success: true, message: "Xóa thực phẩm thành công", data: food };
    } catch (error) {
      return { success: false, message: "Có lỗi khi xóa thực phẩm", error: error.message };
    }
  },

getFoodByCategory: async (categoryId) => {
    try {
      const foods = await Food.find({ category_id: categoryId }).populate('category_id').populate('material_id');

      if (foods.length === 0) {
        return { success: false, message: "Không tìm thấy món ăn trong category này" };
      }

      return { success: true, message: "Lấy danh sách thực phẩm theo category thành công", data: foods };
    } catch (error) {
      return { success: false, message: "Có lỗi khi lấy thực phẩm theo category", error: error.message };
    }
},
    getFoodByMaterial: async (materialId) => {
        try {
          const foods = await Food.find({ material_id: materialId }).populate('category_id').populate('material_id');
    
          if (foods.length === 0) {
            return { success: false, message: "Không tìm thấy món ăn với material này" };
          }
    
          return { success: true, message: "Lấy danh sách thực phẩm theo material thành công", data: foods };
        } catch (error) {
          return { success: false, message: "Có lỗi khi lấy thực phẩm theo material", error: error.message };
        }
      }
}
export default FoodService;
