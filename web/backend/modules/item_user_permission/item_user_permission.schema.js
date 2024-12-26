import { gql } from 'apollo-server-express';

const userPermissionSchema = gql`
type ItemUserPermission @key(fields: "_id") {
_id:ID!
  user_id:ID!
  user_permission_id:ID!
}

type ItemUserPermissionResponse {
  success: Boolean!
  message: String!
  datas: [ItemUserPermission]
  data: ItemUserPermission
}

extend type Mutation {
  addItemUserPermission(user_id: ID!, user_perminssion_id:ID!): ItemUserPermissionResponse!
  deleteItemUserPermission(_id: ID!): ItemUserPermissionResponse!
  updateItemUserPermission(_id: ID!, newName: user_id:ID!,user_perminssion_id:ID! ): ItemUserPermissionResponse!
}

extend type Query {
  listItemUserPermissions: ItemUserPermissionResponse!
  getItemUserPermissionByUserId(user_id: ID!): ItemUserPermissionResponse!
  getItemUserPermissionById(user_id: ID!): ItemUserPermissionResponse!
  getItemUserPermissionByUserPermissionId(user_id:ID!): ItemUserPermissionResponse!
}
`;


export default userPermissionSchema;
