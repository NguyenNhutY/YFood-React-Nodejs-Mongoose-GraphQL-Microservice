import e from "express";
import Employee from "./employee.model.js";

export const createNewEmployee = (data) => {

  return new Employee(data);
  
};
// Các phương thức khác cho Employee
export const createEmployee = async (data) => {
  // Xác thực dữ liệu khách hàng

  const newEmployee =  createNewEmployee(data);

  return await saveEmployee(newEmployee);
};
// Assuming you're using MongoDB with Mongoose



export const findEmployeeName = async (name) => {
  try {
    // Tìm nhân viên theo tên
    const employee = await Employee.findOne({ name: name }).exec();
    if (!employee) {
      throw new Error("Employee not found");
    }
    return employee; // Trả về đối tượng nhân viên nếu tìm thấy
  } catch (error) {
    console.error("Error finding employee:", error);
    throw new Error("Error finding employee");
  }
};
export const saveEmployee = async (employee) => {
  return await employee.save();
};
export const updateEmployee = async (id, data) => {
  return await Employee.findByIdAndUpdate(id, data, { new: true });
};

export const deleteEmployee = async (id) => {
  return await Employee.findByIdAndDelete(id);
};

export const getAllEmployees = async () => {
  return await Employee.find({});
};

export const findEmployeeHireDate = async () => {
  try {
    // Tìm nhân viên có ngày hire năm gần nhất
    const employee = await Employee.findOne().sort({ hire_date: -1 }).exec();
    if (!employee) {
      throw new Error("Employee not found");
    }
    return employee; // Trả về đối tượng nhân viên nếu tìm thấy
  } catch (error) {
    console.error("Error finding employee:", error);
    throw new Error("Error finding employee");
  }
};

export const EmployeeService = {
  
  createEmployee,
  updateEmployee,
  deleteEmployee,
  findEmployeeHireDate,
  findEmployeeName,
  getAllEmployees,
};

export default EmployeeService;
