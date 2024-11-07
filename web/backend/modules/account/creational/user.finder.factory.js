import { findEmployeeAccountId } from "../../employee/employee.service.js";
import { findCustomerAccountId } from "../../customer/customer.service.js";

class UserFinderFactory {
  static async findUser(accountId, isEmployee) {
    console.log(accountId);
    if (isEmployee) {
      return await findEmployeeAccountId(accountId);
    } else {
      return await findCustomerAccountId(accountId);
    }
  }
}

export default UserFinderFactory;
