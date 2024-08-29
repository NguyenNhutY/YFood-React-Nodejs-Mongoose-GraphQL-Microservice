import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://kirichijikuzu:jkt74153967591@cluster0.duwepdz.mongodb.net/Yfood?retryWrites=true&w=majority",
      {
        // Bỏ tùy chọn useNewUrlParser và useUnifiedTopology
        ssl: true,
      }
    );
    console.log("Kết nối db thành công");
  } catch (error) {
    console.error("Lỗi kết nối đến cơ sở dữ liệu", error);

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
