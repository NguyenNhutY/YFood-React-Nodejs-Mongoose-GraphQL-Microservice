import mongoose from "mongoose"; // Corrected import from "mongose" to "mongoose"

const materialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  employee_active_id: { type: mongoose.Schema.Types.ObjectId, default: null },
  item_material_id: { type: mongoose.Schema.Types.ObjectId, default: null },
});

const materialModel =
  mongoose.models.Material || mongoose.model("Material", materialSchema);

const getMaterialDetails = (material_id) => {
  return materialModel
    .findById(material_id)
    .populate("employee_active_id")
    .populate("item_materil_id");
};
export { getMetarialDetails };
export default Material;
