import Material_Batch from "./material_batch.model"
import Item_Material_Food from "../item_material_food/item_material_food.model"
import Material from "../material/material.model"

class MaterialBatch {
    // Hàm nhập lô nguyên liệu và liên kết với món ăn
 static async addMaterialBatchToFood(materialBatchData, itemMaterialFoodId) {
    try {
      // Lưu thông tin lô nguyên liệu (material batch)
      const materialBatch = await Material_Batch.create(materialBatchData);
      
      // Cập nhật item_material_food với material_batch_id mới
      const itemMaterialFood = await Item_Material_Food.findById(itemMaterialFoodId);
      
      // Thêm material_batch_id vào item_material_food
      itemMaterialFood.material_batch_id.push(materialBatch._id);
      await itemMaterialFood.save();
      
      console.log('Lô nguyên liệu đã được thêm và liên kết với món ăn thành công.');
    } catch (error) {
      console.error('Lỗi khi thêm lô nguyên liệu:', error);
    }
  }
  
  
}

export default MaterialBatch;