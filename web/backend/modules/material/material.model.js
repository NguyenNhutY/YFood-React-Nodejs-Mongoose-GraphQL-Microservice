import mongoose from "mongoose"; // Corrected import from "mongose" to "mongoose"

// Định nghĩa schema cho nguyên liệu
const materialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  item_material_id: { type: mongoose.Schema.Types.ObjectId, default: null },
});

// Tạo model từ schema
const materialModel =
  mongoose.models.Material || mongoose.model("Material", materialSchema);

// Hàm lấy chi tiết nguyên liệu theo material_id
const getMaterialDetails = (material_id) => {
  return materialModel
    .findById(material_id)
    .populate("item_material_id");  // Sửa lỗi chính tả: "item_material_id" thay vì "item_materil_id"
};

export { getMaterialDetails }; // Xuất khẩu đúng tên hàm
export default materialModel; // Xuất khẩu đúng model
