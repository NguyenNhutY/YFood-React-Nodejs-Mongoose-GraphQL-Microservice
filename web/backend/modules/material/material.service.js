// material.service.js
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
  createMaterial: async ({ name, description }) => {
    const material = new Material({ name, description });
    return await material.save();
  },
  updateMaterial: async (id, updateData) => {
    return await Material.findByIdAndUpdate(id, updateData, { new: true });
  },
  deleteMaterial: async (id) => {
    return await Material.findByIdAndDelete(id);
  },
};

export default MaterialService;
