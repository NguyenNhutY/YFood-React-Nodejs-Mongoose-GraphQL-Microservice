// services/account.service.js
import bcrypt from "bcrypt";
import { ApolloError } from "apollo-server-errors";
import Account, { getAccountDetails } from "./account.model.js"; // Assuming an Account model is used
import Customer from "../customer/customer.model.js";
import Employee from "../employee/employee.model.js";
import UserFinderFactory from "./creational/user.finder.factory.js";

class AccountService {
  static async createAccount(email, hashedPassword, isEmployee) {
    const newAccount = new Account({
      email: email,
      password: hashedPassword,
      isEmployee: isEmployee,
    });
    await newAccount.save();
    return newAccount;
  }

  static async linkUserToAccount(account, createdUser, isEmployee) {
    if (isEmployee) {
      account.employee_id = createdUser._id;
    } else {
      account.customer_id = createdUser._id;
    }
    await account.save();
  }

  static getAccountResponse(account, user, isEmployee) {
    {
      const accountDetails = getAccountDetails(account._id);

      return {
        _id: account._id,
        email: account.email,
        isEmployee: account.isEmployee,
        name: user.name,
        account_id_in_user: user.account_id,
        employee_id: isEmployee ? user._id : null,
        customer_id: !isEmployee ? user._id : null,
        token: jwt.sign({ _id: account._id }, "secret-key", {
          expiresIn: "1h",
        }),
        account: accountDetails,
      };
    }
  }

  static async findAccountByEmail(email) {
    const account = await Account.findOne({ email });
    if (!account) {
      throw new ApolloError("Account not found", "ACCOUNT_NOT_FOUND");
    }
    return account;
  }
  static async findUserByEmail(email) {
    const account = await Account.findOne({ email });
    if (!account) {
      throw new ApolloError("User not found", "USER_NOT_FOUND");
    }
    coonsole.log("Account" + account);
    const account_id = account._id;
    console.log(account_id);
  }
}

export default AccountService;
