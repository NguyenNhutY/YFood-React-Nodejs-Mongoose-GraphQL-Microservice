import mongoose from 'mongoose';

// Định nghĩa schema cho lô hàng nguyên liệu
const materialBatchSchema = new mongoose.Schema({
  material_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Material'},
  batch_code: { type: String, required: true, unique:true },
  harvest_date: { type: Date, required: true },  // Ngày thu hoạch
  expiry_date: { type: Date, required: true },   // Ngày hết hạn
  quality_check_date: { type: Date },            // Ngày kiểm tra chất lượng (nếu có)
  quantity: { type: Number, required: true },    // Số lượng nguyên liệu trong lô
  item_material_food_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Item_Material_Food'}
}, { timestamps: true });

// Kiểm tra ngày hết hạn và ngày sản xuất
materialBatchSchema.pre('save', function(next) {
  // Kiểm tra nếu có ngày kiểm tra chất lượng
  if (this.quality_check_date && this.expiry_date < this.harvest_date) {
    return next(new Error('Ngày hết hạn phải lớn hơn ngày thu hoạch'));
  }
  // Kiểm tra số lượng nguyên liệu
  if (this.quantity <= 0) {
    return next(new Error('Số lượng phải lớn hơn 0'));
  }
  next();
});

// Tạo model từ schema
const MaterialBatch = mongoose.model('MaterialBatch', materialBatchSchema);

// Hàm lấy chi tiết của một lô hàng nguyên liệu
const getMaterialBatchDetail = async function({ id_material_batch }) {
  try {
    const batch = await MaterialBatch.findById(id_material_batch)
      .populate('material_id')  // Tự động thay thế material_id bằng thông tin nguyên liệu
      .populate('item_material_food_id');  // Tự động thay thế item_material_food_id nếu có
    if (!batch) {
      throw new Error('Lô hàng không tồn tại');
    }
    return batch;  // Trả về chi tiết lô hàng nguyên liệu
  } catch (err) {
    throw err;  // Xử lý lỗi
  }
};

export default MaterialBatch;
export { getMaterialBatchDetail };
