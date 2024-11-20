// material.schema.js
import { gql } from 'apollo-server-express';

const materialSchema = gql`
scalar Decimal 
scalar Date
  type Material {
    id: ID!
    name: String!
    description: String
    price: Decimal!
  }
`;

export default materialSchema;
