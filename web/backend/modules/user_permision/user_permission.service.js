import User from "./user.model.js"; // Đổi tên thành User
import { ObjectId } from "mongodb";

// Các phương thức khác cho User
export const createUser = async (data) => {
  // Xác thực dữ liệu người dùng
  const newUser = createNewUser(data);
  return await saveUser(newUser);
};

export const findUserByName = async (name) => {
  const user = await User.findOne({ name: name });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export const createNewUser = (data) => {
  return new User(data);
};

export const saveUser = async (user) => {
  return await user.save();
};

export const updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

export const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

export const getAllUsers = async () => {
  return await User.find({});
};

export const UserService = {
  findUserByName,
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
};

export default UserService;
