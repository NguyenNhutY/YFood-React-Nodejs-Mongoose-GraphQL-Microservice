import nodemailer from "nodemailer";

// Cấu hình transporter cho Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // hoặc sử dụng máy chủ SMTP khác
  auth: {
    user: process.env.EMAIL_USER, // Email của bạn
    pass: process.env.EMAIL_PASS, // Mật khẩu ứng dụng
  },
});
