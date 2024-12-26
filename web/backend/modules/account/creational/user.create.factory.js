
import User from "../../user/user.model.js"
import ItemUserPermission from "../../item_user_permission/item_user_permission.model.js";
import UserPermission from "../../user_permision/user_permission.model.js"
import { ApolloError } from "apollo-server-express"; // Đừng quên import ApolloError
class UserCreateFactory {
  static async createUser(name, role_account, _id) {

    const createdUser = await creator.create({ name: name, account_id: _id });
    const creator = UserCreateFactory.getUserCreator(role_account,createUser._id);
    if (!creator) {
      throw new Error(`Unsupported role_account: ${role_account}`);
    }
    return createdUser;
  }

  static getUserCreator(role_account, _id) {
    
    const user_permission = UserPermission.findOne({ name: role_account});
    if (!user_permission){
      throw new ApolloError ("User permission not found")
    }
    const newItemUserPermission = new UserPermission({
      user_permission_id: user_permission._id,
      user_id: _id
    })
    if(!newItemUserPermission){
      throw new ApolloError ("User permission not new");
    }
    const saveItemUserPermission = newItemUserPermission;
    if (!saveItemUserPermission ){
      throw new ApolloError ("User permission not saved");
    }

    return saveItemUserPermission;
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
