import { gql } from 'apollo-server-express';

const materialBatchSchema = gql`
extend type Query {
  materialBatches: MaterialBatchResponse
  getAllMaterialBatches: MaterialBatchResponse
  getMaterialBatchById(id: ID!): MaterialBatchResponse!
  getMaterialBatchesByMaterialName(materialName: String!): MaterialBatchResponse!
  getMaterialBatchesByHarvestDate(harvestDate: Date!): MaterialBatchResponse!
  getMaterialBatchesByExpiryDate(expiryDate: Date!): MaterialBatchResponse!
  getMaterialBatchesByQualityCheckDate(qualityCheckDate: Date!): MaterialBatchResponse!
}

extend type Mutation {
  addMaterialBatch( 
    batch_code: String!
    harvest_date: Date!
    expiry_date: Date!
    quantity: Int!
    quality_check_date: Date!
    material_name: String!): MaterialBatchResponse!
}

type MaterialBatch @key(fields: "_id") {
  _id: ID!
  material_id: ID
  batch_code: String!
  harvest_date: Date!
  expiry_date: Date!
  quantity: Int!
  quality_check_date: Date!
  name_material: String
}

input MaterialBatchInput {
  material_id: ID!
  batch_code: String!
  harvest_date: Date!
  expiry_date: Date!
  quantity: Int!
  quality_check_date: Date!
}

type MaterialBatchResponse {
  success: Boolean!
  message: String!
  data: [MaterialBatch!]
}

`;

export default materialBatchSchema;
