import { gql } from "apollo-server-express";

const accountSchema = gql`
  scalar Date

  type Account {
    _id: ID!
    email: String!
    password: String!
    role_account: String!
    createdAt: Date!
    resetPasswordToken: String!
    resetPasswordExpires: Date!
    name: String
    employee_id: ID
    customer_id: ID
    account_id_in_user: ID
  }

  type LoginResponse {
    token: String
    name: String
    role_access: String!
    email: String
  }

  type LogoutResponse {
    success: Boolean!
    message: String
  }

  type ResetPasswordResponse {
    success: Boolean!
    message: String
  }

  type Query {
    getAccountByEmail(email: String!): Account
    getAllAccounts: [Account]!
    getAccountsByName(name: String!): [Account]!
    getAccountsByEmployeeHireDate: [Account]
    getAccountByToken: Account
    getAccountsByGender: [Account]
  }

  type Mutation {
    updatePassword(
      email: String!
      oldpassword: String!
      confirmPassword: String!
      newPassword: String!
    ): String
    registerAccount(
      name: String!
      email: String!
      password: String!
      confirmPassword: String!
      role_account: String!
    ): Account
    forgotPassword(email: String!): String
    resetPassword(
      token: String!
      newPassword: String!
      confirmPassword: String!
    ): ResetPasswordResponse
    logoutAccount(token: String!): LogoutResponse
    loginAccount(
      email: String!
      role_account: String!
      password: String!
    ): LoginResponse
  }
`;

export default accountSchema;
