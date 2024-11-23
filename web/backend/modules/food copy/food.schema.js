import { gql } from "apollo-server-express";
import { GraphQLUpload } from 'graphql-upload';

const foodSchema = gql`

scalar Upload

input FoodInput {
  _id: ID!
  name: String!
  description: String!
  price: Float!
  item_metarial_food_id: ID
  category_id: ID
  img: String!
}

type BehaviorResponse {
  success: Boolean!
  message: String!
  data: [Food]!
}

type Mutation {
  addFoods(_id: ID!, name: String!, price: Float!, desc: String!, img: Upload!): BehaviorResponse!
}

type Query {
  getFoods: BehaviorResponse!
  getFood(_id: ID!): BehaviorResponse!
  getFoodByCategory(category: String!): BehaviorResponse!
  getFoodByMaterial(material: String!): BehaviorResponse!
  getFoodByPriceRange(minPrice: Float!, maxPrice: Float!): [Food]!
  getFoodByRating(rating: Float!): BehaviorResponse!
  getFoodByPopularity(limit: Int): BehaviorResponse!
  getFoodBySale(limit: Int): BehaviorResponse!
}

type Food {
  _id: ID!
  name: String!
  description: String!
  price: Float!
  img: String!  # You might want to include the file path or URL here
}
`;

export default foodSchema;
