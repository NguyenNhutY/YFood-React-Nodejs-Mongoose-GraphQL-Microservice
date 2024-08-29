import mongoose from "mongoose";

// Định nghĩa schema cho Music
const musicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Bắt buộc phải có
    },
    url: {
      type: String,
      required: true, // Bắt buộc phải có
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Tham chiếu đến model User (nhân viên hoặc khách hàng)
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Tham chiếu đến model User (nhân viên hoặc khách hàng)
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

const Music = mongoose.model("Music", musicSchema);

export default Music;
