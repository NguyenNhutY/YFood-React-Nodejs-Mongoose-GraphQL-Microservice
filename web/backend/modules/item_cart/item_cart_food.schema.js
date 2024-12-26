import { gql } from "apollo-server-express";

const itemCartFoodSchema = gql`
type ItemCartFood @key(fields: "_id") {
  _id: ID!
  food_id: ID
  cart_id: ID
  quantity: Int
}

type Food @key(fields: "_id") {
  _id: ID!
  name: String
  price: Float
}

type Cart @key(fields: "_id") {
  _id: ID!
}

type ItemCartFoodReponse {
  message: String
  success: Boolean
  data: ItemCartFood
  datas: [ItemCartFood]
  dataFood: Food
}

extend type Query {
  getItemCartFoods(cart_id: ID!): ItemCartFoodReponse
  getItemCartFoodByFoodName(food_name: String!): ItemCartFoodReponse
  getItemCartFoodByFoodId(food_id: ID!): ItemCartFoodReponse
  getItemCartFoodByCartId(cart_id: ID!): ItemCartFoodReponse
  listItemCartFood: ItemCartFoodReponse
  getItemCartFoodById(id: ID!): ItemCartFoodReponse
}

extend type Mutation {
  addItemCartFood(food_id: ID!, cart_id: ID!): ItemCartFoodReponse
  deleteItemCartFood(_id: ID!): ItemCartFoodReponse
  decreaseItemCartFood(food_id: ID, price: Float): ItemCartFoodReponse
}
`;

export default itemCartFoodSchema;
