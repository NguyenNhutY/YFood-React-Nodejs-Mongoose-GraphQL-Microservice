import { createEmployee } from "../../employee/employee.service.js";
import { createCustomer } from "../../customer/customer.service.js";
import UserCheckEmail from "../behavioral/userCheckEmail.js";

class UserCreateFactory {
  static async createUser(name, email, isEmployee, _id) {
    // Kiểm tra xem email đã tồn tại chưa

    // Tạo đối tượng dựa trên loại tài khoản
    const creator = UserCreateFactory.getUserCreator(isEmployee);

    // Tạo người dùng và trả về dữ liệu
    const createdUser = await creator.create({ name: name, account_id: _id });
    return createdUser;
  }
  static getUserCreator(isEmployee) {
    if (isEmployee) {
      return new EmployeeUserCreator();
    }
    return new CustomerUserCreator();
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

export default UserCreateFactory;
