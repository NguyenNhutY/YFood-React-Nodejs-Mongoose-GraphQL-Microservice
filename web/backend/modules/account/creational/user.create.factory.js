import { createEmployee } from "../../employee/employee.service.js";
import { createCustomer } from "../../customer/customer.service.js";

class UserCreateFactory {
  static async createUser(name, role_account, _id) {
    const creator = UserCreateFactory.getUserCreator(role_account);
    if (!creator) {
      throw new Error(`Unsupported role_account: ${role_account}`);
    }
    const createdUser = await creator.create({ name: name, account_id: _id });
    return createdUser;
  }

  static getUserCreator(role_account) {
    
    if (role_account === "employee") {
      return new EmployeeUserCreator();
    } else if (role_account === "customer") {
      return new CustomerUserCreator();
    }else {
      throw new Error(`Unsupported role_account: ${role_account}`);
    }
  }
}

class UserCreator {
  async create(data) {
    throw new Error("create method must be implemented");
  }
}

// EmployeeUserCreator
class EmployeeUserCreator extends UserCreator {
  async create(data) {
    const employee = await createEmployee(data);
    return employee;
  }
}

// CustomerUserCreator
class CustomerUserCreator extends UserCreator {
  async create(data) {
    const customer = await createCustomer(data);
    return customer;
  }
}

// AdminUserCreator: Tạo cả nhân viên và khách hàng nếu là admin
class AdminUserCreator extends UserCreator {
  async create(data) {
    const employee = await createEmployee(data);
    const customer = await createCustomer(data);
    return { employee, customer };
  }
}

export default UserCreateFactory;
