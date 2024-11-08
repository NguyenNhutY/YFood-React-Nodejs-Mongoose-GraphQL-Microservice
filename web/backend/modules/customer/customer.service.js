import Customer from "./customer.model.js";
import { ObjectId } from "mongodb";
// Các phương thức khác cho Customer
export const createCustomer = async (data) => {
  // Xác thực dữ liệu khách hàng

  const newCustomer = createNewCustomer(data);
  return await saveCustomer(newCustomer);
};



export const findCustomerName = async (name) => {
  const customer = await Customer.findOne({ name: name });
  if (!customer) {
    throw new Error("Customer not found");
  }
  return customer;
};

export const createNewCustomer = (data) => {
  return new Customer(data);
};

export const saveCustomer = async (customer) => {
  return await customer.save();
};

export const updateCustomer = async (id, data) => {
  return await Customer.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCustomer = async (id) => {
  return await Customer.findByIdAndDelete(id);
};

export const getAllCustomers = async () => {
  return await Customer.find({});
};

export const CustomerService = {
  findCustomerName,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  findCustomerAccountId,
  getAllCustomers,
};

export default CustomerService;
