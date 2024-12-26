import { gql } from "apollo-server-express";

const cartSchema = gql`

  type Cart @key(fields: "_id") {
    _id: ID!
    price: Float!
    isDiscounded: Boolean
    customer_id: ID!
    quantity: Int
  }

  type Customer @key(fields: "_id") {
    _id: ID!
    name: String
    email: String
  }

  type Food @key(fields: "_id") {
    _id: ID!
    price: Float!
    image: String
    name: String
    description: String
  }

  type ItemCartFood @key(fields: "_id") {
    _id: ID!
    food_id: ID!  
    quantity: Int
  }

  type CartResponse {
    message: String
    datas: [Cart]
    data: Cart
    dataItemCartFood: ItemCartFood
    datasItemCartFood: [ItemCartFood]
    success: Boolean
  }

  # Định nghĩa kiểu dữ liệu để trả về khi truy vấn danh sách khách hàng
  extend type Query {
    getCartById(_id: ID!): CartResponse
    getCarts: CartResponse
    getCartbyCustomerID(_id: ID!): CartResponse
  }

  extend type Mutation {
    addToCart(customerId: ID!, itemCardId: ID!): CartResponse
    updateCart(cartId: ID!, quantity: Int!): CartResponse
    removeCart(cartId: ID!): CartResponse
  }
`;

export default cartSchema;
