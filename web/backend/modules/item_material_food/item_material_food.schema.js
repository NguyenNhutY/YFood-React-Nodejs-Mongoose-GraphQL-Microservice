import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Material  @key(fields: "_id")  {
    _id: ID!
    name: String
  }

  type Food  @key(fields: "_id")  {
    _id: ID!
    name: String 

  }

  type MaterialBatch @key(fields: "_id")  {
    _id: ID!
    batchNumber: String
  }

  type ItemMaterialFood  @key(fields: "_id")  {
    _id: ID!
food_id: ID!  # Chỉ trả về ID của food
  material_id: ID!  # Chỉ trả về ID của material
  material_batch_id: ID  # Nếu cần, có thể trả về ID của materialBatch
    quantity_required: Float!
    createdAt: String
    updatedAt: String

  }
    type ItemMaterialFoodReponse {
    success: Boolean
    itemMaterialFood: [ItemMaterialFood]
    message: String
    dataFood: Food
    dataMaterial: Material
      dataFoods: [Food]        # Trả về danh sách Food
  dataMaterials: [Material] # Trả về danh sách Material

  }

  extend type Query {
  getItemMaterialFoods: ItemMaterialFoodReponse
    getItemMaterialFoodByfoodName(foodName: String): ItemMaterialFoodReponse
    getItemMaterialDetails(foodId: ID!): ItemMaterialFoodReponse
    getItemMaterialFoodByMaterialName(materialName: String): ItemMaterialFoodReponse
  }
  extend type Mutation {
    addItemMaterialFood(
      foodName: String!,
      materialName: String!,
      materialBatchName: String,
      quantityRequired: Float!
    ): ItemMaterialFoodReponse
  }

`;

export default typeDefs;
