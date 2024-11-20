import mongoose from 'mongoose';

const itemMaterialFoodSchema = new mongoose.Schema({
    food_id: { type: mongoose.Schema.Types.ObjectId, ref: 'food', required: true },
    material_batch_id: { type: mongoose.Schema.Types.ObjectId, ref: 'material_batch', required: true },

    material_id: { type: mongoose.Schema.Types.ObjectId, ref: 'material', required: true },
    quantity_required: { type: Number, required: true }, // Số lượng vật liệu trong món ăn
}, { timestamps: true });


const itemMaterialFood = mongoose.models.itemMaterialFoodSchema || mongoose.model('itemMaterialFood', itemMaterialFoodSchema);

// Hàm lấy tất cả các Item_Material_Food liên kết với món ăn (foodId)
const getItemMaterialDetails = (foodId) => {
  return itemMaterialFood.find({ food_id: foodId })  // Lấy tất cả các ItemMaterialFood liên kết với foodId
    .populate('food_id')
    .populate('material_id')
    .populate('material_batch_id');  // Populated các batch liên quan đến item
};


export default itemMaterialFood;
export {getItemMaterialDetails};