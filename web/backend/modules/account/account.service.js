// services/account.service.js
import bcrypt from "bcrypt";
import { ApolloError } from "apollo-server-errors";
import Account, { getAccountDetails } from "./account.model.js"; // Assuming an Account model is used

// import UserFinderFactory from "./creational/user.finder.factory.js";
import jwt from "jsonwebtoken"

class AccountService {
  static async createAccount(email, hashedPassword) {
    const newAccount = new Account({
      email: email,
      password: hashedPassword,
    });
    await newAccount.save();
    return newAccount;
  }


    static getAccountResponse(account, user) {
      

        return {

        dataUser: [user],
        dataAccount: [account],
          success: true,
          message:"Account Response successfully",
          token: jwt.sign({ email: account.email, role_account:account.role_account }, "secret-key", {
            expiresIn: "1h",
          }),
       
        };
      
    }
  static async findAccountId(_id) {
    try {
      // Tìm nhân viên theo accountId
      const account = await Employee.findOne({ _id: _id }).exec();

      if (!account) {
        throw new Error("Employee not found");
      }

      return account;
    }
      catch(err){
      console.error("Error finding account:", error);
      throw new Error("Error finding account");
    }
  }

  static async findAccountByEmail(email) {
    const account = await Account.findOne({ email:email });
    if (!account) {
      throw new ApolloError("Account not found", "ACCOUNT_NOT_FOUND");
    }
    return account;
  }

  static async findAllAccountsByRoleAccount  (role_account)  {
    const accounts = await Account.find({ role_account: role_account })
    return account;
  }

  static async findAllAccounts(){
    const accounts = await Account.find().exec()
    return account;
  }

  static async findAccountByToken (token){
    const decoded = jwt.verify(token, "secret-key");
    const account = await Account.findById(decoded.email).exec();
    if (!account) {
      throw new ApolloError("Invalid token", "INVALID_TOKEN");
    }
    return account;
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
  return account;}

static async deleteTokenAccount(token){
  const decoded = jwt.verify(token, "secret-key");
  const account = await Account.findByIdAndDelete(decoded._id)
  return account;}

}
export default AccountService;
