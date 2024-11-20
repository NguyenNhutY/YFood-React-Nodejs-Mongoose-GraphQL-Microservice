// service logic for Folder35
import Material_Batch from "../material_batch/material_batch.model"
import Item_Material_Food,{getItemMaterialDetails} from "./item_material_food.model"
import Material from "../material/material.model"
import Food from "../food/food.model"

class ItemMaterialFoodService {
    // Kiểm tra xem có đủ nguyên liệu để hiển thị món ăn hay không
    static async getFoodStockStatus(foodId) {
      try {
        // Lấy tất cả các Item_Material_Food liên kết với món ăn
        const itemMaterialFoods = await getItemMaterialDetails(foodId);
  
        // Lặp qua tất cả các Item_Material_Food để kiểm tra số lượng nguyên liệu
        for (let item of itemMaterialFoods) {
          const materialBatches = item.material_batch_id;  // Lấy danh sách các batch cho nguyên liệu
  
          let totalAvailableQuantity = 0;
          
          // Tính tổng số lượng nguyên liệu có trong các batch
          materialBatches.forEach(batch => {
            totalAvailableQuantity += batch.quantity; // Cộng dồn số lượng từ mỗi batch
          });
  
          // Kiểm tra xem tổng số lượng nguyên liệu có đủ để đáp ứng yêu cầu của món ăn không
          if (totalAvailableQuantity < item.quantity_required) {
            // Nếu không đủ nguyên liệu, món ăn không thể hiển thị
            return false;
          }
        }
  
        // Nếu tất cả Item_Material_Food đều có đủ nguyên liệu
        return true;
      } catch (error) {
        console.error(error);
        throw new Error('Lỗi khi kiểm tra số lượng nguyên liệu');
      }
    }
  
    // Sử dụng hàm
    static async checkFoodStock(foodId) {
      try {
        const canDisplay = await ItemMaterialFoodService.getFoodStockStatus(foodId);
        if (canDisplay) {
          console.log(`Món ăn có đủ nguyên liệu để hiển thị.`);
        } else {
          console.log(`Món ăn không đủ nguyên liệu để hiển thị.`);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
  
  export default ItemMaterialFoodService;
  Cập nhật hàm getItemMaterialDetails:
  Hàm này sẽ trả về tất cả các Item_Material_Food liên quan đến foodId.
  
  javascript
  Sao chép mã
  // Hàm lấy tất cả các Item_Material_Food liên kết với món ăn (foodId)
  const getItemMaterialDetails = (foodId) => {
    return itemMaterialFood.find({ food_id: foodId })  // Lấy tất cả các ItemMaterialFood liên kết với foodId
      .populate('food_id')
      .populate('material_id')
      .populate('material_batch_id');  // Populated các batch liên quan đến item
  };