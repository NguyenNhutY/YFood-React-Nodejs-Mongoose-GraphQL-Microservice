// services/account.service.js
import bcrypt from "bcrypt";
import { ApolloError } from "apollo-server-errors";
import Account, { getAccountDetails } from "./account.model.js"; // Assuming an Account model is used
import Customer from "../customer/customer.model.js";
import Employee from "../employee/employee.model.js";
import UserFinderFactory from "./creational/user.finder.factory.js";

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
    if (role_account == "employee") {
      account.employee_id = createdUser._id;
    } else if (role_account == "customer") {
      account.customer_id = createdUser._id;
    } else if (role_account == "admin") {
      account.employee_id = createdUser._id;
      account.customer_id = createdUser._id;
    } else {
      throw new Error("Invalid role");
    }
    await account.save();
  }

  static getAccountResponse(account, user, role_account) {
    {
      const accountDetails = getAccountDetails(account._id);

      return {
        _id: account._id,
        email: account.email,
        role_account: account.role_account,
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
//   static async findEmployeeAccountId(accountId) {
//     try {
//       // Tìm nhân viên theo accountId
//       const employee = await Employee.findOne({ account_id: accountId }).exec();

//       if (!employee) {
//         throw new Error("Employee not found");
//       }

//       return employee; // Trả về đối tượng nhân viên nếu tìm thấy
//     } catch (error) {
//       console.error("Error finding employee:", error);
//       throw new Error("Error finding employee");
//     }
//   }

//   static async findCustomerAccountId(accountId) {
//     try {
//       console.log(accountId);
//       const accountObjectId = mongoose.Types.ObjectId(accountId);
//       console.log(accountObjectId);
//       // Kiểm tra accountId có hợp lệ hay không
//       if (!mongoose.Types.ObjectId.isValid(accountId)) {
//         throw new Error("Invalid accountId format");
//       }
//       // Tìm khách hàng theo accountId
//       const customer = await Customer.findOne({
//         account_id: accountObjectId,
//       }).select("name account_id");

//       if (!customer) {
//         throw new Error("Customer not found");
//       }

//       return customer; // Trả về đối tượng khách hàng nếu tìm thấy
//     } catch (error) {
//       console.error("Error finding customer:", error);
//       throw new Error("Error finding customer");
//     }
//   }

//   static async findAccountId(_id) {
//     return (admin = await Account.findOne({ _id: _id }).exec());
//   }


//   static async findEmployeeAccountId(accountId) {
//     try {
//       // Tìm nhân viên theo accountId
//       const employee = await Employee.findOne({ account_id: accountId }).exec();

//       if (!employee) {
//         throw new Error("Employee not found");
//       }

//       return employee; // Trả về đối tượng nhân viên nếu tìm thấy
//     } catch (error) {
//       console.error("Error finding employee:", error);
//       throw new Error("Error finding employee");
//     }
//   }

//   static async findEmployeeAccount (role_account){
//     return admin = await Account.findOne ({role_account: role_account})
//   }

//   static async findAccountByEmail(email) {
//     const account = await Account.findOne({ email:email });
//     if (!account) {
//       throw new ApolloError("Account not found", "ACCOUNT_NOT_FOUND");
//     }
//     return account;
//   }
//   static async findUserByEmail(email) {
//     const account = await Account.findOne({ email });
//     if (!account) {
//       throw new ApolloError("User not found", "USER_NOT_FOUND");
//     }
//     coonsole.log("Account" + account);
//     const account_id = account._id;
//     console.log(account_id);
//   }
// }

export default AccountService;
