import { gql } from "apollo-server-express";

const foodSchemal = gql`
union FoodInputUnion = FoodInput | [FoodInput!]!

input FoodInput {
  _id: ID!
  name: String!
  description: String!
  price: Float!
  item_metarial_food_id: ID
  category_id:ID
}

type behaviorResponse{
 success: Boolean!
 message: String!
 data: [Food]
}

type Mutation {
  addFoods(foods: FoodInputUnion!): behaviorResponse!
}

type Query {
  getFoods: behaviorResponse!
  getFood(_id: ID!): ReponseBehavior!
  getFoodByCategory(category: String!): behaviorResponse!
  getFoodByMaterial(material: String!):behaviorResponse!
  getFoodByPriceRange(minPrice: Float!, maxPrice: Float!): [Food]!
  getFoodByRating(rating: Float!):behaviorResponse!
  getFoodByPopularity(limit: Int): behaviorResponse!
  getFoodBySale(limit: Int):behaviorResponse!
  }


type Food {
  _id: ID!
  name: String!
  description: String!
  price: Float!
}
`