import { GraphQLString, GraphQLID, GraphQLFloat } from 'graphql';
import MaterialBatch from './material_batch.model.js';
import Material from '../material/material.model.js';
import { ApolloError } from 'apollo-server-express';


const materialBatchResolver = {
  MaterialBatch: {
    __resolveReference: (batch) => {
      // Fetch the complete MaterialBatch from the database or another source using batch._id
      return {
        _id: batch._id,
        materialId: "material_id_example", // Fetch actual value
        batchCode: "batch_code_example",   // Fetch actual value
        harvestDate: new Date(),
        expiryDate: new Date(),
        quantity: 100,
        qualityCheckDate: new Date(),
      };
    },
  },
    Query: {
      materialBatches: async()=> await MaterialBatch.find(),
      // Lấy tất cả lô nguyên liệu
      getAllMaterialBatches: async () => {  // Fixed the typo here
        try {
          const batches = await MaterialBatch.find();
          return {
            success: true,
            message: 'Lấy tất cả lô nguyên liệu thành công!',
            data: batches
          };
        } catch (error) {
          console.error(error);
          throw new ApolloError('Lỗi khi lấy dữ liệu lô nguyên liệu');
        }
      },
  
      // Lấy thông tin lô nguyên liệu theo ID
      getMaterialBatchById: async (_, { id }) => {
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
      },
  
      // Lấy lô nguyên liệu theo tên nguyên liệu
      getMaterialBatchesByMaterialName: async (_, { materialName }) => {  // Fixed the typo here too
        try {
          const material = await Material.findOne({ name: materialName });
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
      },
  
      // Lấy lô nguyên liệu theo ngày thu hoạch
      getMaterialBatchesByHarvestDate: async (_, { harvestDate }) => {
        try {
          const batches = await MaterialBatch.find({ harvest_date: harvestDate });
          return {
            success: true,
            message: 'Lấy lô nguyên liệu theo ngày thu hoạch thành công!',
            data: batches
          };
        } catch (error) {
          console.error(error);
          throw new ApolloError('Lỗi khi lấy lô nguyên liệu');
        }
      },
  
      // Lấy lô nguyên liệu theo ngày hết hạn
      getMaterialBatchesByExpiryDate: async (_, { expiryDate }) => {
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
      },
  
      // Lấy lô nguyên liệu theo ngày kiểm tra chất lượng
      getMaterialBatchesByQualityCheckDate: async (_, { qualityCheckDate }) => {
        try {
          const batches = await MaterialBatch.find({ quality_check_date: qualityCheckDate });
          return {
            success: true,
            message: 'Lấy lô nguyên liệu theo ngày kiểm tra chất lượng thành công!',
            data: batches
          };
        } catch (error) {
          console.error(error);
          throw new ApolloError('Lỗi khi lấy lô nguyên liệu');
        }
      },
    },
  
    Mutation: {
      // Thêm một lô nguyên liệu mới
      addMaterialBatch: async (_, { input }) => {
        try {
          const material = await Material.findOne({ name: input.materialName });
          // Tạo mới một lô nguyên liệu từ input
          const newMaterialBatch = new MaterialBatch({
            material_id: material._id,
            batch_code: input.batchCode,
            harvest_date: input.harvestDate,
            expiry_date: input.expiryDate,
            quality_check_date: input.qualityCheckDate,
            quantity: input.quantity,
          });
          
          // Lưu vào cơ sở dữ liệu
          await newMaterialBatch.save();
          
          return {
            success: true,
            message: 'Thêm lô nguyên liệu thành công!',
            data: [newMaterialBatch]
          };
        } catch (error) {
          console.error(error);
          throw new ApolloError('Lỗi khi thêm lô nguyên liệu');
        }
      },
    },
  };
  

  
  
  export default materialBatchResolver;
