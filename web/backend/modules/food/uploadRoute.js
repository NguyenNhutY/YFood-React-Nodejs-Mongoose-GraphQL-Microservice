import express from "express";
import multer from "multer";
import cloudinary from "./cloudinaryConfig.js";
import Account from "./models/account.model.js"; // Model Mongoose của bạn

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    // Tải file lên Cloudinary
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      resource_type: "auto", // "image" cho hình ảnh hoặc "auto" cho cả ảnh và video
    });

    // Lưu URL vào cơ sở dữ liệu
    const account = await Account.findById(req.body.email);
    if (!account) {
      return res.status(404).json({ error: "Tài khoản không tồn tại." });
    }

    account.face_video = result.secure_url; // Thay trường `face_video` bằng URL

    await account.save();

    res.json({
      message: "Upload thành công!",
      success: "true",
      url: result.secure_url,
    });
  } catch (error) {
    res.status(500).json({ error: "Upload thất bại.", success: "false" });
  }
});

export default router;
