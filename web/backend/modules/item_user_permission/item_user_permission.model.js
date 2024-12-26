import mongoose from "mongoose";

const itemUserPermissionSchema = new mongoose.Schema(
  {
    user_permission_id:{type:mongoose.Schema.Types.ObjectId, ref:'user_permission', required:true},
    user_id:{type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true}
  },
  { minimize: false }
);

const ItemUserPermission = mongoose.model("ItemUserPermission", itemUserPermissionSchema); // Đổi tên thành User



export default ItemUserPermission; // Đổi tên xuất khẩu thành User
