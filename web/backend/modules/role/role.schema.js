import { gql } from 'apollo-server-express';

const roleSchema = gql`
type Role @key(fields: "_id") {
_id:ID!
name:String
}

type RoleResponse {
  success: Boolean!
  message: String!
  datas: [Role]
  data: Role
}

extend type Mutation {
  addRole(name:String!): RoleResponse!
  deleteRole(name: String!): RoleResponse!
  updateRole(name: String! ): RoleResponse!
}

extend type Query {
  listRoles: RoleResponse!
  getRoleById(_id: ID!): RoleResponse!
  getRoleByName(name:String!): RoleResponse!
}
`;


export default roleSchema;
