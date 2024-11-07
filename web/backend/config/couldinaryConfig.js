// import { v2 as cloudinary } from "cloudinary";
// import dotenv from "dotenv";

// // Load biến môi trường
// dotenv.config();

// // Cấu hình Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Hàm tải lên video/hình ảnh
// async function uploadFile(filePath, email, mediaType) {
//   try {
//     const result = await cloudinary.uploader.upload(filePath, {
//       resource_type: mediaType === "video" ? "video" : "image",
//     });
//     return result.secure_url; // Trả về URL đã tải lên
//   } catch (error) {
//     console.error("Lỗi khi tải lên:", error);
//     throw error;
//   }
// }

// // Sử dụng hàm upload
// (async () => {
//   const email = "your_user_id_here"; // Thay bằng ID người dùng thực tế
//   try {
//     const imageUrl = await uploadFile("./path/to/image.jpg", userId, "image");
//     console.log("Image URL:", imageUrl);

//     const videoUrl = await uploadFile("./path/to/video.mp4", userId, "video");
//     console.log("Video URL:", videoUrl);
//   } catch (error) {
//     console.error("Lỗi:", error);
//   }
// })();
