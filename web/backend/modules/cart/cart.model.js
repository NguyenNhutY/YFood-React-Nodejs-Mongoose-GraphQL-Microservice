import mongoose from "mongoose";
import User from "../user/user.model.js"
const cartSchema = new mongoose.Schema(
  {

    isDiscount:{type:"Boolean",},
   price:{type:"Decimal"},
    quantity:{type:"Number"},
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    }, // Khóa ngoại để liên kết với Account
  },
  { minimize: false }
);


const getCartDetails = async (user_id) => {
  try {
    const customer = await User.findById(user_id).populate("user_id"); // Lấy dữ liệu từ Account

    console.log(customer);
    return customer;
  } catch (error) {
    console.error("Error fetching customer details:", error);
  }
};

export default mongoose.model('Cart', cartSchema);

export { getCartDetails };
