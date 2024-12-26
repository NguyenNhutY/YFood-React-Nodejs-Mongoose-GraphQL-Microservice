import { log } from "console";
import mongoose from "mongoose";

// Định nghĩa schema cho món ăn (Food)
const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createDate: { type: Date, default: Date.now }, // Sử dụng Date.now để tạo ngày mặc định
  description: { type: String, required: true },
  price: { type: Number, required: true }, // Sử dụng Decimal128 nếu cần độ chính xác cao cho giá trị
  image: { type: String, required: true }, // Nếu có trường hình ảnh
  item_metarial_food_id: { type: mongoose.Schema.Types.ObjectId, ref: "Item Material Food" },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default:null, required: false  }, // Đảm bảo Category đã được khai báo trong MongoDB
},{collections:"foods"});

// Tạo model Food từ foodSchema
const Food = mongoose.model('Food', foodSchema);

// Hàm để lấy thông tin chi tiết món ăn, bao gồm populate


export { getFoodDetails };

export default Food;
