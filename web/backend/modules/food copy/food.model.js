// model logic for Folder4import mongoose from "mongoose"; // Corrected import from "mongose" to "mongoose"
import mongoose from "mongoose";
import { Decimal128 } from "bson";

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createDate:{type: Date,default: new Date},
  description: { type: String, required: true },
  price: { type: Decimal128, required: true }, // Corrected typo from "requred" to "required"
  image: { type: String},
  // item_cart_id: { type: mongoose.Schema.Types.ObjectI, default: null },
  item_metarial_food_id: { type: mongoose.Schema.Types.ObjectId, ref: "Meterial" },
  // employee_acctive_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Employee_Active",
  // }, // Khóa ngoại để liên kết với Account
  // item_order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Item_Order" },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // Khóa ngoại để liên kết với Account
  // material_name: { type: String, required: true },
});

const Food = mongoose.model('Food', foodSchema); // Đảm bảo rằng Food được định nghĩa đúng

const getFoodDetails = (food_id) => {
  return foodModel
    .findById(food_id)
    .populate("item_metarial_food_id")
    .populate("category_id"); // Corrected typo from "requred" to "required"
  // .polulate("item_cart_id")
  // .polulate("employee_active")
  // .polulate("item_order_id")
};

export { getFoodDetails };

export default Food;