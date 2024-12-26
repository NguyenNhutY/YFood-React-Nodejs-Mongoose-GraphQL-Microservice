import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    phone: { type: String, default: null },
    age: { type: Number, min: 18, default: null },
    avatar: { type: String, default: null },
    gender: { type: String, default: null },
    birth_date: { type: Date, default: null },
    name: { type: String, required: true, default: null }, // Sửa type thành String và bỏ dấu nháy
    cart_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      default: null,
    },
    account_id: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Account",
      default: null,
    }, // Khóa ngoại để liên kết với Account
  },
  { minimize: false }
);

const User = mongoose.model("User", userSchema); // Đổi tên thành User

const getUserDetails = async (userId) => { // Đổi tên hàm thành getUserDetails
  try {
    const user = await User.findById(userId).populate("account_id").populate("cart_id"); // Lấy dữ liệu từ Account
    console.log(user);
    return user;
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
};

export default User; // Đổi tên xuất khẩu thành User
export { getUserDetails }; // Đổi tên xuất khẩu hàm
