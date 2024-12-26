import { gql } from 'apollo-server-express';

const materialSchema = gql`
  scalar Decimal
  scalar Date

  type Material @key(fields: "_id"){
    _id: ID!
    name: String!
    description: String
  }
      input MaterialInput {
    name: String!

  }

  type MaterialResponse {
    success: Boolean!
    message: String!
    dataMaterial: [Material]
  }

  extend type Query {
    listMaterial: MaterialResponse
    getMaterialById(id: ID!): MaterialResponse!
    getMaterialByName(name: String!): MaterialResponse!
  }

  extend type Mutation {
  deleteMaterial(id:ID!): [MaterialResponse]!
    updateMaterial(id: ID!, name: String!, description: String!): MaterialResponse!
      createMaterial(materials: [MaterialInput]!): MaterialResponse!
  }
`;

export default materialSchema;
