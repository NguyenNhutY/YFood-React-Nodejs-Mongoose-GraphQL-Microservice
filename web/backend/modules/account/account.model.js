import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {

    createdAt: {
      type: Date,
      default: Date.now,
    },
    email: { type: String, required: true, unique: true },
    role_account: {
      type: String,
      enum: [ "employee", "customer"],
      default: null,
    },
    password: { type: String, required: true, default: null },

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      default: null,
    },
  },
  { minimize: false }
);

const Account = mongoose.model("Account", accountSchema);

const getAccountDetails = async (account_id) => {
  try {
    const account = await Account.findById(account_id)
      .populate("user_id") // Lấy dữ liệu từ Customer

    console.log(account);
    return account;
  } catch (error) {
    console.error("Error fetching account details:", error);
  }
};

export default Account;
export { getAccountDetails };
