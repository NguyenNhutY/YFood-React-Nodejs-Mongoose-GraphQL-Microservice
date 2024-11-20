import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    _id: { type: String, required: true }, // Sử dụng String làm ID
    name: { type: String, required: true },
    image: { type: String },
}, { 
    timestamps: true // Tự động thêm createdAt và updatedAt
});

export default mongoose.model('Category', categorySchema);
