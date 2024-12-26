// material.service.js
import { ApolloError } from "apollo-server-errors";
import Material from "./material.model.js";

const MaterialService = {
  listMaterial: async () => {
    // Truy vấn danh sách vật liệu từ database
    return await Material.find();
  },
  getMaterialById: async (id) => {
    return await Material.findById(id);
  },
  getMaterialByName: async (name) => {
    return await Material.findOne({ name });
  },
  
  
  updateMaterial: async (id, updateData) => {
    return await Material.findByIdAndUpdate(id, updateData, { new: true });
  },
  deleteMaterial: async (id) => {
    return await Material.findByIdAndDelete(id);
  },
};

export default MaterialService;
