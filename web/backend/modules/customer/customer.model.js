import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    phone: { type: String, default: null },
    age: { type: Number, min: 18, default: null },
    avatar: { type: String, default: null },
    
    gender: { type: String, default: null },
    birth_date: { type: Date, default: null },
    name: { type: "String", required: "true", default: null },
    account_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      default: null,
    }, // Khóa ngoại để liên kết với Account
  },
  { minimize: false }
);

const Customer = mongoose.model("Customer", customerSchema);

const getCustomerDetails = async (customerId) => {
  try {
    const customer = await Customer.findById(customerId).populate("account_id"); // Lấy dữ liệu từ Account

    console.log(customer);
    return customer;
  } catch (error) {
    console.error("Error fetching customer details:", error);
  }
};

export default Customer;

export { getCustomerDetails };
