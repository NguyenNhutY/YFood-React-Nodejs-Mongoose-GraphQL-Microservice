import Account from "../account.model.js";
import { ApolloError } from "apollo-server-express"; // Đừng quên import ApolloError

class UserCheckEmail {
  static async checkEmail(email) {
    const existingUser = await Account.findOne({ email: email });
    if (existingUser) {
      throw new Error("Email already exists");
    }
  }


static async checkEmailCompany(email){
  if (!email){
    throw new ApolloError("Email is null");
  }
  const emailDomain = email.split('@')[1];
  let role = "customer";  // Mặc định là user

  if (emailDomain === "yfood.com") {
    role = "employee";  // Nếu email có đuôi @company.com, phân quyền là employee
  }
  console.log("role"+ role);
  return role;
}
}
export default UserCheckEmail;
