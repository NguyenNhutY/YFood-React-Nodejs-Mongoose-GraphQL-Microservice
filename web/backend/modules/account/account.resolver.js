 // resolvers.js
import Account, { getAccountDetails } from "./account.model.js";
import User, { getUserDetails } from "../user/user.model.js";
import bcrypt from "bcrypt";
import { ApolloError } from "apollo-server-express"; // Đừng quên import ApolloError
import validator from "validator";
import jwt from "jsonwebtoken";
import {
  validateEmail,
  validatePasswordMatch,

  isValidPassword,
} from "./utils/validators.js";
import { addToBlacklist } from "./utils/isAuth.js";
import UserCreateFactory from "./creational/user.create.factory.js"; // Import Factory to create account
import UserCheckEmail from "./behavioral/userCheckEmail.js"; // Import AccountCheckEmail to check email
// import UserFinderFactory from "./creational/user.finder.factory.js";
import AccountService from "./account.service.js";
import { cartResolver } from "../cart/cart.resolver.js"; // Import addToCart từ cartResolver
import UserPermission from "../user_permision/user_permission.model.js"
import ItemUserPermission from "../item_user_permission/item_user_permission.model.js";

const createToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
    algorithm: "HS256",
    subject: "User Registration",
  });
};

const accountResolver = {
  Query: {
    accounts: async () => await Account.find(), // Truy xuất danh sách tài khoản từ MongoDB

    getAccountByEmail: async (_, { email }) => {
      const account = await AccountService.findAccountByEmail(email);
      return account
    },

    getAllAccounts: async (_,{}) => {
      const account = await AccountService.findAllAccounts();
      return account
    },
    getAllAccountsByRoleAccount: async (_, { role_account }) => {
      const accounts = await AccountService.findAllAccountsByRoleAccount(role_account);
      console.log('Accounts:', accounts);  // In dữ liệu trả về từ phương thức
      return accounts;
    },
   
    getAccountById: async (_,{_id})=>{
  const account = await AccountService.findAccountById(_id);
  return account;
    },
    getAccountByToken: async (_,{token})=>{
      const account = await AccountService.findAccountByToken(token);
      return account;
    }
  },
  Mutation: {
    registerAccount: async (
      _,
      { email, password, confirmPassword, name }
    ) => {
      try {
        validateEmail(email);
        // Validate password format
        if (!isValidPassword(password)) {
          throw new ApolloError(
            error.message,
            error.code || "INTERNAL_SERVER_ERROR"
          );
        }
        // Check if passwords match
        validatePasswordMatch(password, confirmPassword);
        // Check if email already exists
        await UserCheckEmail.checkEmail(email);
 
        const role_account = await UserCheckEmail.checkEmailCompany(email);
        
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create new account
        const newAccount = await AccountService.createAccount(
          email,
          hashedPassword,
        );
        // Create the user (Employee or Customer)
        const createdUser = await UserCreateFactory.createUser(
          name,

          newAccount._id
        );
  const checkUserPermission = await UserPermission.findOne({name: role_account})
if (!checkUserPermission){
  throw new ApolloError("User permission check failed");
}else{
  const itemUserPermission = await ItemUserPermission.create({
    user_permission_id: checkUserPermission._id,
    user_id: createdUser._id
  })
  if (!itemUserPermission){
    throw new ApolloError("Item user permission not created");
  }
}
        // Return the user info
        return AccountService.getAccountResponse(
          newAccount,
          createdUser,
        );
      } catch (error) {
        throw new ApolloError(
          error.message,
          error.code || "INTERNAL_SERVER_ERROR"
        );
      }
    },
    async addAccountEmployee(_,{email, password}){
      const role_account = "employee";
      const newAccount = await AccountService.createAccount(
        email,
        password,

      );
      const createdUser = await UserCreateFactory.createUser(
        "Employee",
        newAccount._id
      );
      await AccountService.linkUserToAccount(
        newAccount,
        createdUser,
        role_account
      );
      return newAccount;
    }
    async loginAccount(_, { email, password }) {
      // Fetch the account
      const account = await AccountService.findAccountByEmail(email);
      if (!account) {
        throw new ApolloError("Account not found", "ACCOUNT_NOT_FOUND");
      }
    
      // Log values for debugging (optional)
      console.log("Password provided by user:", password);
      console.log("Password from database:", account.password);
    
      // Ensure passwords are defined
      if (!password || !account.password) {
        throw new ApolloError("Invalid credentials provided");
      }
    
      // Verify the password
      const isMatch = await bcrypt.compare(password, account.password);
      if (!isMatch) {
        throw new ApolloError("Incorrect password");
      }
      // Role-based logic
      let user = null;
      if (account.role_account === "employee") {
        user = await Employee.findOne({ account_id: account._id });
        if (!user) {
          throw new ApolloError("Employee information not found");
        }
        console.log("Employee:", user);
      } else if (account.role_account === "customer") {
        user = await Customer.findOne({ account_id: account._id });
        if (!user) {
          throw new ApolloError("Customer information not found");
        }
        console.log("Customer:", user);
      } else {
        throw new ApolloError("Invalid role specified");
      }
    
      // Return the account response
      return AccountService.getAccountResponse(account, user);
    },
    
    logoutAccount: async (_, { token }) => {
      try {
        if (!token) {
          throw new ApolloError("No token provided", "INVALID_TOKEN");
        }

        // Thêm token vào blacklist (Redis hoặc database)
        await addToBlacklist(token);
    
        return { success: true, message: "Logged out successfully" };
      } catch (error) {
        throw new ApolloError("Server error");
      }
    },
    forgotPassword: async (_, { email }) => {
      const account = await Account.findOne({ email });
      if (!account) throw new ApolloError("Account not found");
      const resetToken = crypto.randomBytes(20).toString("hex");
      account.resetPasswordToken = resetToken;
      account.resetPasswordExpires = Date.now() + 3600000; // 1 hour
      await account.save();
      // Gửi email với mã reset token
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset",
        text: `You are receiving this email because you (or someone else) requested a password reset. 
               Please click on the following link, or paste this into your browser to complete the process:
               ${resetUrl}
               If you did not request this, please ignore this email and your password will remain unchanged.`,
      };
      try {
        await transporter.sendMail(mailOptions);
      } catch (error) {
        console.error("Error sending email:", error);
        throw new ApolloError("Failed to send email");
      }
      return { success: true, message: "Password reset email sent" };
    },
    updatePassword: async (
      _,
      { oldPassword, newPassword, confirmPassword, email }
    ) => {
      const account = await Account.findOne({ email: email });
      if (!account) throw new ApolloError("Account not found");
      const isMatch = await bcrypt.compare(oldPassword, account.password);
      if (!isMatch) throw new ApolloError("Old password is incorrect");
      if (newPassword !== confirmPassword || !isValidPassword(newPassword)) {
        throw new ApolloError("Password validation failed");
      }
      account.password = await bcrypt.hash(newPassword, 10);
      await account.save();
      return { success: true, message: "Password updated successfully" };
    },
    resetPassword: async (_, { token, newPassword, confirmPassword }) => {
      // Tìm tài khoản bằng token reset password
      const account = await Account.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });
      // Kiểm tra nếu không tìm thấy tài khoản hoặc token hết hạn
      if (!account) {
        throw new ApolloError("Invalid or expired token", "INVALID_TOKEN");
      }
      // Kiểm tra nếu mật khẩu mới không khớp hoặc không hợp lệ
      if (newPassword !== confirmPassword || !isValidPassword(newPassword)) {
        throw new ApolloError("Password validation failed");
      }
      // Cập nhật mật khẩu cho tài khoản
      account.password = await bcrypt.hash(newPassword, 10);
      account.resetPasswordToken = undefined;
      account.resetPasswordExpires = undefined;
      // Lưu tài khoản đã thay đổi mật khẩu
      await account.save();
      // Trả về đối tượng thành công theo schema định nghĩa
      return {
        success: true,
        message: "Password reset successfully",
      };
    },
  },
};

export default accountResolver;
