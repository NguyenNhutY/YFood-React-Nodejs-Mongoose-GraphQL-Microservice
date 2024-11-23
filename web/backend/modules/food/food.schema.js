import { gql } from "apollo-server-express";

const foodSchema = gql`
  scalar Upload

  type Food @key(fields: "id") {
    _id: String
    name: String
    description: String
    price: Float
    item_metarial_food_id: ID
    category_id: ID
    image: String
  }

  type FoodResponse {
    success: Boolean
    message: String
    data: Food
  }

  type Mutation {
    addFoods(category_id: ID, name: String!, price: Float!, description: String!, image: String!): FoodResponse!
  }

  type Query {
    listFood: FoodResponse
    getFoodById(_id: ID!): FoodResponse
    getFoodByCategory(category: String!): FoodResponse
    getFoodByMaterial(material: String!): FoodResponse
    getFoodByPriceRange(minPrice: Float!, maxPrice: Float!): [Food]
    getFoodByRating(rating: Float!): FoodResponse
    getFoodByPopularity(limit: Int): FoodResponse
    getFoodBySale(limit: Int): FoodResponse
  }
`;

export default foodSchema;
