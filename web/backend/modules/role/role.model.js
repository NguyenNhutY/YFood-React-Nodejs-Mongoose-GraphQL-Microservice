import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
        unique: true,
      },
  },
  { minimize: false }
);

const Role = mongoose.model("Role", roleSchema); // Đổi tên thành User



export default Role; // Đổi tên xuất khẩu thành User
