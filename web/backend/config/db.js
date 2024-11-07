import mongoose from "mongoose";
import dotenv from "dotenv";

// Load biến môi trường
dotenv.config();
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URL_MONGO, {
      ssl: true, // Nếu cần thiết, để thiết lập SSL
    });
    console.log("Kết nối db thành công");
  } catch (error) {
    console.error("Lỗi kết nối đến cơ sở dữ liệu", error);

    // Xử lý các lỗi kết nối
    if (
      error.name === "MongoNetworkError" &&
      error.message.includes("IP address is not whitelisted")
    ) {
      console.error(
        "Địa chỉ IP của bạn không được phép truy cập. Vui lòng thêm địa chỉ IP của bạn vào danh sách trắng trong MongoDB Atlas."
      );
    } else if (error.name === "MongoNetworkError") {
      console.error(
        "Có lỗi mạng. Vui lòng kiểm tra kết nối internet và trạng thái MongoDB Atlas."
      );
    } else if (error.name === "MongooseServerSelectionError") {
      console.error(
        "Mongoose không thể kết nối với bất kỳ máy chủ nào trong cụm MongoDB Atlas của bạn. Vui lòng kiểm tra trạng thái cụm."
      );
    } else {
      console.error("Đã xảy ra lỗi không xác định:", error);
    }

    process.exit(1);
  }
};
