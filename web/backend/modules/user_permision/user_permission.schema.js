import { gql } from 'apollo-server-express';

const userPermissionSchema = gql`
type UserPermission @key(fields: "_id") {
  _id: ID!
  name: String!
}

type UserPermissionResponse {
  success: Boolean!
  message: String!
  datas: [UserPermission]
  data: UserPermission
}

extend type Mutation {
  addUserPermission(name: String!): UserPermissionResponse!
  deleteUserPermission(name: String!): UserPermissionResponse!
  updateUserPermission(name: String!, newName: String!): UserPermissionResponse!
}

extend type Query {
  listUserPermissions: UserPermissionResponse!
  getUserPermissionByName(name: String!): UserPermissionResponse
  getUserPermissionById(_id: ID!): UserPermissionResponse
}
`;


export default userPermissionSchema;
