import Material from "../material/material.model.js";
import MaterialBatch from "./material_batch.model.js"; // Đảm bảo import đúng mô hình MaterialBatch
import MaterialBatchFactory from "./creational/material_batch.factory.creational.js"; // Tạo một factory để tạo MaterialBatch nếu cần

class MaterialBatchService {
  static async addBatch(material_name, batch_code, harvest_date, expiry_date, quality_check_date, quantity) {
    try {
      // Tìm nguyên liệu theo tên
      let material = await MaterialRepository.getBatchByMaterialName(material_name);
      if (!material) {
        throw new Error('Nguyên liệu không tồn tại');
      }

      // Sử dụng factory để tạo lô nguyên liệu
      const newMaterialBatch = MaterialBatchFactory.createBatch(
        material._id, batch_code, harvest_date, expiry_date, quality_check_date, quantity
      );

      // Lưu lô nguyên liệu
      await newMaterialBatch.save();

      return {
        success: true,
        message: 'Thêm lô nguyên liệu thành công!',
        data: [newMaterialBatch],
      };
    } catch (error) {
      console.error(error);
      throw new Error('Lỗi khi thêm lô nguyên liệu');
    }
  }

  static async getBatchByHarvestDate(harvest_date) {
    try {
      const batches = await MaterialBatch.find({ harvest_date: harvest_date }); // Tìm lô nguyên liệu theo ngày thu hoạch
      return {
        success: true,
        message: 'Lấy lô nguyên liệu thành công! theo ngày thu hoạch',
        data: batches
      };
    } catch (error) {
      console.error(error);
      throw new Error('L��i khi lấy lô nguyên liệu theo ngày thu hoạch');
    }
  }
  static async getMaterialBatchesByMaterialName(material_name) {
    try {
      const material = await Material.findOne({ name: material_name });
      if (!material) {
        return {
          success: false,
          message: 'Không tìm thấy nguyên liệu này',
          data: []
        };
      }
      const batches = await MaterialBatch.find({ material_id: material._id });
      return {
        success: true,
        message: 'Lấy lô nguyên liệu thành công!',
        data: batches
      };
    } catch (error) {
      console.error(error);
      throw new ApolloError('Lỗi khi lấy lô nguyên liệu');
    }
  }
  static async getAllMaterialBatches() {
    try {
      const batches = await MaterialBatch.find();
  
      // Always return a response with success set to true or false
      return {
        success: true,  // Ensure success is always a boolean
        message: batches.length > 0 ? 'Lấy tất cả lô nguyên liệu thành công!' : 'Không có lô nguyên liệu nào',
        data: batches || []  // Return an empty array if no batches found
      };
    } catch (error) {
      console.error(error);
  
      // Ensure success is false if an error occurs
      return {
        success: false,
        message: 'Lỗi khi lấy dữ liệu lô nguyên liệu',
        data: []  // Return an empty array in case of error
      };
    }
  }
  
  static async getBatchById(_id) {
    try {
      const batch = await MaterialBatch.findById(id);
      if (!batch) {
        return {
          success: false,
          message: 'Không tìm thấy lô nguyên liệu',
          data: []
        };
      }
      return {
        success: true,
        message: 'Lấy lô nguyên liệu thành công!',
        data: [batch]
      };
    } catch (error) {
      console.error(error);
      throw new ApolloError('Lỗi khi lấy lô nguyên liệu');
    }
  }

  static async getBatchByExpireDate(expire_date){
    try {
      const batches = await MaterialBatch.find({ expiry_date: expiryDate });
      return {
        success: true,
        message: 'Lấy lô nguyên liệu theo ngày hết hạn thành công!',
        data: batches
      };
    } catch (error) {
      console.error(error);
      throw new ApolloError('Lỗi khi lấy lô nguyên liệu');
    }
  }
  
  static async getBatchByQualityCheckDate(quality_check_date){
    try {
      const batches = await MaterialBatch.find({ harvest_date: harvestDate });
      return {
        success: true,
        message: 'Lấy lô nguyên liệu theo ngày kiem tra chat luong thành công!',
        data: batches
      };
    } catch (error) {
      console.error(error);
      throw new ApolloError('Lỗi khi lấy lô nguyên liệu');
    }
  }

}




export default MaterialBatchService;
