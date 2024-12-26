import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    _id: { type: String, required: true }, // Sử dụng String làm ID
    name: { type: String, required: true },
    image: {
        type: String, // Hoặc type khác tùy theo định dạng dữ liệu bạn muốn
        default: '', // Có thể đặt giá trị mặc định là rỗng
      },
}, { 
    timestamps: true // Tự động thêm createdAt và updatedAt
});

export default mongoose.model('Category', categorySchema);
