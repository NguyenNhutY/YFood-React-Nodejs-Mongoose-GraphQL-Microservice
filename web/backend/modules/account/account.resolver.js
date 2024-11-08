// resolvers.js
import Account, { getAccountDetails } from "./account.model.js";
import Employee, { getEmployeeDetails } from "../employee/employee.model.js";
import Customer, { getCustomerDetails } from "../customer/customer.model.js";
import bcrypt from "bcrypt";
import { ApolloError } from "apollo-server-express"; // Đừng quên import ApolloError
import validator from "validator";
import jwt from "jsonwebtoken";
import {
  validateEmail,
  validatePasswordMatch,
  validatePassword,
  isValidPassword,
} from "./utils/validators.js";
import { addToBlacklist } from "./utils/isAuth.js";
import UserCreateFactory from "./creational/user.create.factory.js"; // Import Factory to create account
import UserCheckEmail from "./behavioral/userCheckEmail.js"; // Import AccountCheckEmail to check email
import UserFinderFactory from "./creational/user.finder.factory.js";
import { findEmployeeName } from "../employee/employee.service.js";
import { findCustomerName } from "../customer/customer.service.js";
import AccountService from "./account.service.js"; // A new service class for account-related operations
import session from "session";

const createToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
    algorithm: "HS256",
    subject: "User Registration",
  });
};

const accountResolver = {
  Query: {
    getAccountByEmail: async (_, { email }) => {
      try {
        // Retrieve account information
        const account = await Account.findOne({ email: email }).select(
          "-password"
        );

        if (!account) {
          throw new Error("Account not found"); // This will throw an error if the account is null
        }

        return {
          success: true,
          email: account.email,
          role_account: account.role_account,
        };
      } catch (error) {
        throw new ApolloError(error.message, "INTERNAL_SERVER_ERROR");
      }
    },

    getAllAccounts: async () => {
      return await Account.find().select("-password");
    },
    getAllAccountsByRoleAccount: async (role_account) => {
      return await Account.find({ role_account: role_account }).select(
        "-password"
      );
    },
    getAccountsByName: async (_, { name }) => {
      let accounts = [];
      // Giả sử bạn xác định admin thông qua một giá trị trong server (có thể là một biến toàn cục hoặc một thông số nào đó)
      const isAdmin = true; // Ví dụ: bạn có thể thay thế giá trị này bằng cách khác để xác định admin
      // Nếu là admin, tìm cả employee và customer
      if (isAdmin) {
        const employees = await Employee.find({ name: name });
        const customers = await Customer.find({ name: name });
        // Kết hợp cả employee và customer
        accounts = [...employees, ...customers];
      } else {
        // Nếu không phải admin, tìm customer hoặc employee tùy ý (hoặc có thể là chỉ tìm employee)
        const employees = await Employee.find({ name: name });
        const customers = await Customer.find({ name: name });
        // Trả về kết quả tìm kiếm của cả hai, hoặc một loại cụ thể tùy theo yêu cầu
        accounts = [...employees, ...customers]; // Kết hợp tất cả kết quả
      }
      console.log(accounts); // Kiểm tra dữ liệu trả về
      return accounts;
    },
    getAcountbyId: async (_,{_id})=>{
      const account = await Account.findById(_id).select("-password");
      if (!account) {
        throw new Error("Account not found");
      }
      return account;
    }
  },
  Mutation: {
    registerAccount: async (
      _,
      { email, password, confirmPassword, isEmployee, name }
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
        await UserCheckEmail.checkEmail(email, role_account);
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create new account
        const newAccount = await AccountService.createAccount(
          email,
          hashedPassword,
          role_account
        );
        // Create the user (Employee or Customer)
        const createdUser = await UserCreateFactory.createUser(
          name,
          email,
          role_account,
          newAccount._id
        );
        // Link the user to the account and save
        await AccountService.linkUserToAccount(
          newAccount,
          createdUser,
          role_account
        );
        // Return the user info
        return AccountService.getAccountResponse(
          newAccount,
          createdUser,
          name,
          role_account
        );
      } catch (error) {
        throw new ApolloError(
          error.message,
          error.code || "INTERNAL_SERVER_ERROR"
        );
      }
    },
    async loginAccount(_, { email, password, isEmployee }, context) {
      // Tìm tài khoản theo email
      const account = await Account.findOne({ email: email });
      if (!account) {
        throw new ApolloError("Tài khoản không tồn tại");
      }
      // Kiểm tra password
      const isMatch = await bcrypt.compare(password, account.password);
      if (!isMatch) {
        throw new ApolloError("Mật khẩu không chính xác");
      }
      if (account.isEmployee !== isEmployee) {
        // Nếu isEmployee sai, trả về lỗi cụ thể
        throw new ApolloError(
          `Quyền truy cập không chính xác cho email ${email}`
        );
      }
      // Kiểm tra quyền truy cập (isEmployee)
      let user = null;
      if (isEmployee) {
        // Nếu là nhân viên, tìm thông tin nhân viên
        user = await Employee.findOne({ account_id: account._id });
        console.log("Employee" + user);
      } else {
        // Nếu là khách hàng, tìm thông tin khách hàng
        user = await Customer.findOne({ account_id: account._id });
        console.log("Customer" + user);
      }

      // Tạo token
      const token = jwt.sign({ _id: account._id }, "secret-key", {
        expiresIn: "1h",
        algorithm: "HS256",
        subject: "User Registration",
      });
      context.session.token = token;

      return {
        token,
        name: user.name,
        email: account.email,
        isEmployee: account.isEmployee,
      };
    },
    logoutAccount: async (_, { token }) => {
      try {
        context.session.destroy((err) => {
          if (err) {
            throw ApolloError("Err destroying");
          }
        });
        // Thêm token vào danh sách đen cho đến khi token hết hạn
        addToBlacklist(token);
        return { success: true, message: "Logged out successfully" };
      } catch (error) {
        console.error("Error logging out user:", error);
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
