// import {
//   findCustomerAccountId,
//   findEmployeeAccountId,
// } from "../account.service.js";

// // Giả sử có một hàm findAllUsers() để trả về tất cả người dùng nếu là admin.
// import { findAllUsers } from "../../user/user.service.js";

// class UserFinderFactory {
//   static async findUser(accountId, role_account) {
//     console.log(accountId);

//     if (role_account === "employee") {
//       return await findEmployeeAccountId(accountId);
//     } else if (role_account === "customer") {
//       return await findCustomerAccountId(accountId);
//     } else if (role_account === "admin") {
//       // Nếu là admin, có thể trả về danh sách tất cả người dùng (hoặc thông tin admin)
//       return await findAllUsers(); // Hàm này có thể được định nghĩa trong `user.service.js` để lấy tất cả người dùng.
//     } else {
//       throw new Error("Invalid role_account");
//     }
//   }
// }

// export default UserFinderFactory;
