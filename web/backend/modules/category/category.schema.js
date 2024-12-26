// schema.js
import { gql } from "apollo-server-express";

const catgorySchema = gql`

type Category @key(fields: "_id") {
  _id: ID!
  name: String!
  image: String
}

type Food @key(fields: "_id") {
  _id: ID!
  name: String!
  description: String
  price: Float
  category_id: ID!
  image: String
}

type CategoryResponse {
  message: String
  datas: [Category]
  data: Category
  dataFood: Food
  datasFood: [Food]
  success: Boolean
}

# Queries
extend type Query {
  listCategory(filter:String): CategoryResponse
  getCategoryById(_id: ID!): CategoryResponse
  getCategoryByFoodName(name: String!): CategoryResponse
  getCategoryByName(name: String!): CategoryResponse
  getCategoryByFoodId(_id: ID!): CategoryResponse
}

# Mutations
extend type Mutation {
  createCategory(name: String!, image: String): CategoryResponse
  updateCategory(name: String, image: String): CategoryResponse
  deleteCategory(_id: ID!): CategoryResponse
}

`;
export default catgorySchema;
