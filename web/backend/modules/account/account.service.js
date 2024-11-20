// services/account.service.js
import bcrypt from "bcrypt";
import { ApolloError } from "apollo-server-errors";
import Account, { getAccountDetails } from "./account.model.js"; // Assuming an Account model is used
import Customer from "../customer/customer.model.js";
import Employee from "../employee/employee.model.js";
// import UserFinderFactory from "./creational/user.finder.factory.js";
import jwt from "jsonwebtoken"

class AccountService {
  static async createAccount(email, hashedPassword, role_account) {
    const newAccount = new Account({
      email: email,
      password: hashedPassword,
      role_account: role_account,
    });
    await newAccount.save();
    return newAccount;
  }

  static async linkUserToAccount(account, createdUser, role_account) {
    if (role_account == "employee" ) {
      account.employee_id = createdUser._id;
    } else if (role_account == "customer" ) {
      account.customer_id = createdUser._id;
    }else if (role_account == "admin"){
    account.employee_id = createdUser._id;
    account.customer_id = createdUser._id;
    
    } else {
      throw new Error("Invalid role");
    }
    await account.save();
  }

    static getAccountResponse(account, user) {
      {

        return {

        dataUser: user,
        dataAccount: account,
          success: true,
          message:"Account Response successfully",
          token: jwt.sign({ email: account.email }, "secret-key", {
            expiresIn: "1h",
          }),
       
        };
      }
    }
  static async findAccountId(_id) {
    try {
      // Tìm nhân viên theo accountId
      const account = await Employee.findOne({ _id: _id }).exec();

      if (!account) {
        throw new Error("Employee not found");
      }

      return {    dataAccount: account,success:"true",message:"Find Account By Id Successly"}; // Trả về đối tượng nhân viên nếu tìm thấy
    } catch (error) {
      console.error("Error finding account:", error);
      throw new Error("Error finding account");
    }
  }

  static async findAccountByEmail(email) {
    const account = await Account.findOne({ email:email });
    if (!account) {
      throw new ApolloError("Account not found", "ACCOUNT_NOT_FOUND");
    }
    return {
      dataAccount: account,
      success: true,
      message:"Get Account By Email"
    }
  }

  static async findAllAccountsByRoleAccount  (role_account)  {
    const accounts = await Account.find({ role_account: role_account })
    return {dataAccount: accounts, success:true, message: "Get All Accounts by Role Account successfully"};
  }

  static async findAllAccounts(){
    const accounts = await Account.find().exec()
    return {dataAccount: accounts, success:true, message: "Get All Accounts successfully"};
  }

  static async findAccountByToken (token){
    const decoded = jwt.verify(token, "secret-key");
    const account = await Account.findById(decoded.email).exec();
    if (!account) {
      throw new ApolloError("Invalid token", "INVALID_TOKEN");
    }
    return {account, success:true, message: "Get Account By Token successfully"};
  }

  static async updateAccount(_id, updated_account) {
    const account = await Account.findByIdAndUpdate(
      _id,
      updated_account,
      { new: true }
    ).exec();
    if (!account) {
      throw new ApolloError("Account not found", "ACCOUNT_NOT_FOUND");
    }
    return {dataAccount: account, sucess:true, message: "Account updated successfully"};
  }


static async deleteAccount(_id) {
  const account = await Account.findByIdandDelete(_id)
  return { success:true, message: "Account deleted"};
}

static async deleteTokenAccount(token){
  const decoded = jwt.verify(token, "secret-key");
  const account = await Account.findByIdAndDelete(decoded._id)
  return { success:true, message: "Account deleted"};
}

}
export default AccountService;
