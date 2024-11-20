import { gql } from 'apollo-server-express';

const materialBatchSchema = gql`


  type MaterialBatch @key(fields: "_id") {
    _id: ID!
    materialId: ID!
    batchCode: String!
    harvestDate: Date!
    expiryDate: Date!
    quantity: Int!
    qualityCheckDate: Date!
  }

  input MaterialBatchInput {
    materialId: ID!
    batchCode: String!
    harvestDate: Date!
    expiryDate: Date!
    quantity: Int!
    qualityCheckDate: Date!
  }

  type MaterialBatchResponse {
    success: Boolean!
    message: String!
    data: [MaterialBatch]
  }

  type Query {
    materialBatches: [MaterialBatch]
    getAllMaterialBatches: MaterialBatchResponse
    getMaterialBatchById(id: ID!): MaterialBatchResponse!
    getMaterialBatchesByMaterialName(materialName: String!): MaterialBatchResponse!
    getMaterialBatchesByHarvestDate(harvestDate: Date!): MaterialBatchResponse!
    getMaterialBatchesByExpiryDate(expiryDate: Date!): MaterialBatchResponse!
    getMaterialBatchesByQualityCheckDate(qualityCheckDate: Date!): MaterialBatchResponse!
  }

  type Mutation {
    addMaterialBatch(input: MaterialBatchInput!): MaterialBatchResponse!
  }
`;

export default materialBatchSchema;
