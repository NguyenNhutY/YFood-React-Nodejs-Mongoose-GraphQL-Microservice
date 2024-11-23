// material_batch.factory.creational.js
import MaterialBatch from "../material_batch.model.js"; // Đảm bảo đường dẫn chính xác tới model MaterialBatch

class MaterialBatchFactory {
  // Phương thức tạo mới MaterialBatch
  static createBatch(materialId, batchCode, harvestDate, expiryDate, qualityCheckDate, quantity) {
    return new MaterialBatch({
      material_id: materialId,         // ID nguyên liệu
      batch_code: batchCode,           // Mã lô nguyên liệu
      harvest_date: harvestDate,       // Ngày thu hoạch
      expiry_date: expiryDate,         // Ngày hết hạn
      quality_check_date: qualityCheckDate, // Ngày kiểm tra chất lượng
      quantity: quantity,             // Số lượng
    });
  }
}

export default MaterialBatchFactory;
