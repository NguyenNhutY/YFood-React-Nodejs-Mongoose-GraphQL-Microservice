import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";

// Tạo __dirname tương tự CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config({ path: path.resolve(__dirname, "../.env") });
// Kiểm tra biến môi trường
if (!process.env.URL_MONGO) {
  console.error("Biến URL_MONGO chưa được thiết lập trong file .env.");
  process.exit(1); // Dừng ứng dụng nếu không có URL_MONGO
}

console.log('MongoDB URL:', process.env.URL_MONGO);

export const connectDB = async () => {
  try {
    console.log("Đang kết nối tới MongoDB...");
    await mongoose.connect(process.env.URL_MONGO, {
      useNewUrlParser: true, useUnifiedTopology: true,
      connectTimeoutMS: 10000,        // Thời gian tối đa để kết nối (10 giây)
      ssl: true, // Sử dụng SSL khi kết nối MongoDB Atlas
      serverSelectionTimeoutMS: 5000,  // Thời gian tối đa để lựa chọn server (5 giây)
      socketTimeoutMS: 45000,  // Thời gian chờ khi truy vấn lâu
    });

    console.log("Kết nối db thành công");
  } catch (error) {
    console.error("Lỗi kết nối đến cơ sở dữ liệu:", error.message);

    if (
      error.name === "MongoNetworkError" &&
      error.message.includes("IP address is not whitelisted")
    ) {
      console.error("Địa chỉ IP không được phép truy cập. Vui lòng thêm địa chỉ IP của bạn vào danh sách trắng trong MongoDB Atlas.");
    } else if (error.name === "MongoNetworkError") {
      console.error("Có lỗi mạng. Kiểm tra kết nối internet và trạng thái MongoDB Atlas.");
    } else if (error.name === "MongooseServerSelectionError") {
      console.error("Mongoose không thể kết nối với máy chủ MongoDB. Kiểm tra trạng thái cụm MongoDB.");
    } else {
      console.error("Lỗi không xác định:", error);
    }

    process.exit(1); // Dừng ứng dụng nếu không kết nối được
  }
};
