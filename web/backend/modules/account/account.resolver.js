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
        const account = await Account.findOne({ email }).select(
          "email account_id isEmployee"
        );
        if (!account) {
          throw new Error("Account not found"); // This will throw an error if the account is null
        }

        // Retrieve user information using UserFinderFactory
        const user = await UserFinderFactory.findUser(
          account.account_id,
          account.isEmployee
        );
        if (!user) {
          throw new Error("User not found");
        }

        // Return the requested fields
        return {
          email: account.email,
          isEmployee: account.isEmployee,
          name: user.name, // Accessing name directly from the user object
        };
      } catch (error) {
        throw new ApolloError(error.message, "INTERNAL_SERVER_ERROR");
      }
    },
    getAllAccounts: async () => {
      return await Account.find().select("-password");
    },
    async getAccountsByName(_, { name }) {
      // Tìm kiếm employees theo tên
      const employees = await findEmployeeName(name);
      // Tìm kiếm customers theo tên
      const customers = await findEmployeeName(name);

      console.log(customers); // Kiểm tra dữ liệu customers

      // Kiểm tra dữ liệu trả về có phải là mảng không trước khi xử lý
      const resultEmployees = Array.isArray(employees)
        ? employees.map((employee) => ({
            name: employee.name,
            account_id: employee.account_id,
          }))
        : employees
        ? [employees]
        : []; // Nếu employees không phải mảng nhưng có dữ liệu, gói nó trong mảng

      const resultCustomers = Array.isArray(customers)
        ? customers.map((customer) => ({
            name: customer.name,
            account_id: customer.account_id,
          }))
        : customers
        ? [customers]
        : []; // Nếu customers không phải mảng nhưng có dữ liệu, gói nó trong mảng
      console.log("employees:", employees);
      console.log("customers:", customers);

      console.log("resultEmployees:", resultEmployees);
      console.log("resultCustomers:", resultCustomers);
      // Nếu không có dữ liệu, trả về thông báo hoặc mảng rỗng
      if (resultEmployees.length === 0 && resultCustomers.length === 0) {
        return [];
      }

      const accounts = [];

      // Nếu có dữ liệu employees, kết hợp vào mảng accounts
      if (employees && resultEmployees.length > 0) {
        accounts.push(
          ...resultEmployees.map((employee) => ({
            email: accont.email,
            isEmployee: true,
            employee_id: employee.employee_id,
            pass: employee.pass,
            employee: {
              name: employee.name,
              account_id: employee.account_id,
            },
          }))
        );
      }

      // Nếu có dữ liệu customers, kết hợp vào mảng accounts
      if (customers && resultCustomers.length > 0) {
        accounts.push(
          ...resultCustomers.map((customer) => ({
            email: accont.email,
            isEmployee: false,
            customer_id: customer.customer_id,
            pass: customer.pass,

            name: customer.name,
            _id: customer.account_id,
          }))
        );
      }

      return accounts;
    },
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
        await UserCheckEmail.checkEmail(email, isEmployee);
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create new account
        const newAccount = await AccountService.createAccount(
          email,
          hashedPassword,
          isEmployee
        );
        // Create the user (Employee or Customer)
        const createdUser = await UserCreateFactory.createUser(
          name,
          email,
          isEmployee,
          newAccount._id
        );
        // Link the user to the account and save
        await AccountService.linkUserToAccount(
          newAccount,
          createdUser,
          isEmployee
        );
        // Return the user info
        return AccountService.getAccountResponse(
          newAccount,
          createdUser,
          name,
          isEmployee
        );
      } catch (error) {
        throw new ApolloError(
          error.message,
          error.code || "INTERNAL_SERVER_ERROR"
        );
      }
    },
    async loginAccount(_, { email, password, isEmployee }) {
      // Tìm tài khoản theo email
      const account = await Account.findOne({ email });
      if (!account) {
        throw new Error("Tài khoản không tồn tại");
      }
      // Kiểm tra password
      const isMatch = await bcrypt.compare(password, account.password);
      if (!isMatch) {
        throw new Error("Mật khẩu không chính xác");
      }
      if (account.isEmployee !== isEmployee) {
        // Nếu isEmployee sai, trả về lỗi cụ thể
        throw new Error(`Quyền truy cập không chính xác cho email ${email}`);
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
      });
      return {
        token,
        name: user.name,
        email: account.email,
        isEmployee: account.isEmployee,
      };
    },
    logoutAccount: async (_, { token }) => {
      try {
        // Kiểm tra tính hợp lệ của token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

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
  },

  resetPassword: async (_, { token, newPassword, confirmPassword }) => {
    const account = await Account.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!account)
      throw new ApolloError("Invalid or expired token", "INVALID_TOKEN");

    if (newPassword !== confirmPassword || !isValidPassword(newPassword)) {
      throw new ApolloError("Password validation failed");
    }

    account.password = await bcrypt.hash(newPassword, 10);
    account.resetPasswordToken = undefined;
    account.resetPasswordExpires = undefined;
    await account.save();
    return { success: true, message: "Password reset successfully" };
  },
};

export default accountResolver;
