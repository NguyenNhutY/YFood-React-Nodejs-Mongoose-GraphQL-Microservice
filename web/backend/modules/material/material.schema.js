import { gql } from 'apollo-server-express';

const materialSchema = gql`
  scalar Decimal
  scalar Date

  type Material {
    id: ID!
    name: String!
    description: String
  }

  type MaterialResponse {
    success: Boolean!
    message: String!
    dataMaterial: [Material]
  }

  type Query {
    listMaterial: MaterialResponse!
    getMaterialById(id: ID!): MaterialResponse!
    getMaterialByName(name: String!): MaterialResponse!
  }

  type Mutation {
  deleteMaterial(id:ID!): [MaterialResponse]!
    updateMaterial(id: ID!, name: String!, description: String!): MaterialResponse!
    createMaterial(name: String!, description: String!): MaterialResponse!
  }
`;

export default materialSchema;
