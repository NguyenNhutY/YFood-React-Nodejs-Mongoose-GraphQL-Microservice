import Material from "./material.model.js";
import MaterialService from "./material.service.js";
import { ApolloError } from "apollo-server-express"; // Đừng quên import ApolloError

const materialResolver = {
 Query:{
    listMaterial: async (_, {}) => {
     return await MaterialService.listMaterial();
    },
    getMaterialById: async (_, { id }) => {
     return await MaterialService.getMaterialById(id);
    },
    getMaterialByName: async(_,{ name }) => {
        return await MaterialService.getMaterialByName(name);
    } 
 }  ,
 Mutation:{

   createMaterial: async (_, { materials }) => {
      if (!materials || materials.length === 0) {
        throw new ApolloError("No materials provided");
      }
    
      try {
        // Kiểm tra sự tồn tại của các material trong cơ sở dữ liệu
        const existingMaterials = await Material.find({ name: { $in: materials.map(m => m.name) } });
        console.log(existingMaterials)
        if (existingMaterials.length > 0) {
          const existingNames = existingMaterials.map(material => material.name);
          throw new ApolloError(`The following materials already exist: ${existingNames.join(", ")}`);
        }
    
        // Tạo các material mới từ danh sách
        const newMaterials = materials.map(materialData => ({
          name: materialData.name,
        }));
    
        let savedMaterials;
    
        // Nếu chỉ có một nguyên liệu, thêm một nguyên liệu duy nhất
        if (newMaterials.length ===1) {
          const newMaterial = new Material(newMaterials[0]);
          savedMaterials = await newMaterial.save();
          savedMaterials = savedMaterials ? [savedMaterials] : null; // Đảm bảo luôn trả về mảng
        } else {
          // Nếu có nhiều nguyên liệu, sử dụng insertMany
          savedMaterials = await Material.insertMany(newMaterials);
        }
    
        if (!savedMaterials || savedMaterials.length === 0) {
          throw new ApolloError("Failed to save materials");
        }
    
        return {
          success: true,
          message: "Materials added successfully",
          dataMaterial: savedMaterials,
        };
      } catch (error) {
        console.error("Error creating materials:", error);
        throw new ApolloError("Error creating materials", error.message);
      }
   },    
    
    updateMaterial: async (_, { id, name, description, price, quantity, image }) => {
     return await MaterialService.updateMaterial(id, { name, description, price, quantity, image });
    },
    deleteMaterial: async (_, { id }) => {
     return await MaterialService.deleteMaterial(id);
    }

 } 
}
export default materialResolver;