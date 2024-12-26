import mongoose from "mongoose";

const userPermissionSchema = new mongoose.Schema(
  {
  
    name: { type: String, required: true,unique:true, default: null }, // Sửa type thành String và bỏ dấu nháy

  },
  { minimize: false }
);

const UserPermission = mongoose.models.UserPermission || mongoose.model('UserPermission', userPermissionSchema);



export default UserPermission; // Đổi tên xuất khẩu thành User
