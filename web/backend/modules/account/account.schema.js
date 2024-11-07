// schema.js
import { gql } from "apollo-server-express";

const accountSchema = gql`
  scalar Date

  type Account {
    _id: ID!
    email: String!
    password: String!
    isEmployee: Boolean!
    createdAt: Date!
    name: String # Định nghĩa name tại đây nếu bạn cần
    employee_id: ID
    customer_id: ID
    account_id_in_user: ID
  }

  type LoginResponse {
    token: String
    name: String
    isEmployee: Boolean
    email: String
  }

  type LogoutResponse {
    success: Boolean!
    message: String
  }

  type Query {
    getAccountByEmail(email: String!): Account
    getAllAccounts: [Account]!
    getAccountsByName(name: String!): [Account]!
    getAccountsByEmployeeHireDate: [Account]
    getAccountByToken: [Account]
    getAccountsByGender: [Account]
  }

  type Mutation {
  updatePassword{
   email: String!
      oldpassword = password: String!
       confirmPassword: String!
       newPassword:String!
  }:String
    registerAccount(
      name: String!
      email: String!
      oldpassword =: String!
      confirmPassword: String!
      isEmployee: Boolean!
    ): Account
    forgotPassword(email: String!): String # Thêm trường này
    resetPassword(
      token: String!
      newPassword: String!
      confirmPassword: String!
    ): String # Thêm trường này
    logoutAccount(token: String!): LogoutResponse
    loginAccount(
      email: String!
      isEmployee: Boolean!
      password: String!
    ): LoginResponse
  }
`;

export default accountSchema;
