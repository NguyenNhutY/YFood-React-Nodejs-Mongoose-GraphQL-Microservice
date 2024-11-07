// schema.js
import { gql } from "apollo-server-express";

const customerSchema = gql`
  scalar Date
  type Customer {
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
    getAllCustomers: [Customer]
    getCustomerById(id: ID!): Customer
    getCustomerByPhone(phone: String!): Customer
  }

  # Định nghĩa các biến đổi (mutations) cho Customer
  type Mutation {
    createCustomer(
      phone: String!
      age: Int
      avatar: String
      gender: String
      birth_date: String
      name: String!
      account_id: ID!
    ): Customer
    updateCustomer(
      id: ID!
      phone: String
      age: Int
      avatar: String
      gender: String
      birth_date: String
      name: String
      account_id: ID
    ): Customer
    deleteCustomer(id: ID!): String # Trả về thông điệp xác nhận
  }
`;
export default customerSchema;
