// resolvers.js
import Account from "./account.model.js";
import Employee from "../employee/employee.model.js";
import Customer from "../customer/customer.model.js";
import bcrypt from "bcrypt";
import { ApolloError } from "apollo-server-express"; // Đừng quên import ApolloError
import validator from "validator";
import jwt from "jsonwebtoken";
import { addToBlacklist } from "./isAuth.js";

const isValidPassword = (password) => {
  const minLength = validator.isLength(password, { min: 8, max: 100 });
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar
  );
};

const createToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
    algorithm: "HS256",
    subject: "User Registration",
  });
};

const accountResolver = {
  Query: {
    // getAccountByEmail: async (_, { email }) => {
    //   return await Account.findOne({ email }).select("-password");
    // },
    getAllAccounts: async () => {
      return await Account.find().select("-password");
    },
    // getAccountEmployeeByName: async (_, { name,isEmployee}) => {
    //   if(isEmployee)
    //   {
    //     const employee = await Employee.findOne({ name });
    //     // Nếu không tìm thấy nhân viên, trả về null hoặc một thông báo tùy ý
    //     if (!employee) {
    //       throw new ApolloError("Employee not found");
    //     }
    //     // Tìm tài khoản dựa trên employeeId của nhân viên
    //     const account = await Account.findOne({
    //       employeeId: employee._id,
    //     }).select("-password");
    //     // Nếu không tìm thấy tài khoản, trả về null hoặc một thông báo tùy ý
    //     if (!account) {
    //       throw new ApolloError("Account not found");
    //     }
    //     return account;
    //   }else{
    //     throw new ApolloError("Account is not Employee");
    //   }
    // },
    getAccountByToken: async (_, { token }) => {
      const { email } = jwt.verify(token, process.env.JWT_SECRET);
      return await Account.findOne({ email }).select("-password");
    },
    // getAccountsByEmployeeHireDate: async (_, { hireDate }) => {
    //   // Tìm tất cả nhân viên theo hireDate
    //   const employees = await Employee.find({ hireDate: hireDate });
    //   // Lấy ID của các nhân viên
    //   const employeeIds = employees.map((employee) => employee._id);
    //   // Tìm tất cả tài khoản tương ứng với các employeeId
    //   return await Account.find({ employeeId: { $in: employeeIds } }).select(
    //     "-password"
    //   );
    // },
    // getAccountsByGender: async (_, { gender, isEmployee }) => {
    //   if (isEmployee) {
    //     // Tìm tất cả nhân viên theo gender
    //     const employees = await Employee.find({ gender: gender });
    //     // Lấy ID của các nhân viên
    //     const employeeIds = employees.map((employee) => employee._id);

    //     // Tìm tất cả tài khoản tương ứng với các employeeId
    //     return await Account.find({ employeeId: { $in: employeeIds } }).select(
    //       "-password"
    //     );
    //   } else {
    //     // Tìm tất cả khách hàng theo gender
    //     const customers = await Customer.find({ gender: gender });
    //     // Lấy ID của các khách hàng
    //     const customerIds = customers.map((customer) => customer._id);

    //     // Tìm tất cả tài khoản tương ứng với các customerId
    //     return await Account.find({ customerId: { $in: customerIds } }).select(
    //       "-password"
    //     );
    //   }
    // },
  },
  Mutation: {
  

export default customerResolver;
