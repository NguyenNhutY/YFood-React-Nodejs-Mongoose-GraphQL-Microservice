// schema.js
import { gql } from "apollo-server-express";

const employeeSchema = gql`
  scalar Date
  type Employee {
    id: ID!
    phone: String!
    age: Int
    avatar: String
    gender: String
    birth_date: String
    name: String!
    account_id: ID!
  }

  # Định nghĩa kiểu dữ liệu để trả về khi truy vấn danh sách khách hàng
  type Query {
    getAllEmployees: [Employee]
    getEmployeeById(id: ID!): Employee
    getEmployeeByPhone(phone: String!): Employee
  }
  type Mutation {
    createEmployee(
      phone: String!
      age: Int
      avatar: String
      gender: String
      birth_date: String
      name: String!
      account_id: ID!
    ): Customer
    updateEmployee(
      id: ID!
      phone: String
      age: Int
      avatar: String
      gender: String
      birth_date: String
      name: String
      account_id: ID
    ): Customer
    deleteEmployee(id: ID!): String # Trả về thông điệp xác nhận
  }
`;
export default employeeSchema;
