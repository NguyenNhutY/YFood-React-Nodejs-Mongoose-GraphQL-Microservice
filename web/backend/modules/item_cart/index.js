import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from '../../config/db.js';  // Ensure correct path
import { ApolloServer } from "apollo-server-express";
import itemCartFoodSchema from './item_cart_food.schema.js';  // Import material schema
import itemCartFoodResolver from "./item_cart_food.resolver.js"; // Material batch resolvers
import { buildSubgraphSchema } from "@apollo/subgraph";
import { uploadAllImages } from '../../config/couldinaryConfig.js';  // Import hàm uploadAllImages

const app = express();
const PORT = process.env.PORT || 4006;

// Connect to the database
connectDB();  // Ensure correct database connection logic
uploadAllImages();

// Apply middleware for file uploads before Apollo Server middleware

// Define the schema using buildFederatedSchema for Federation
const schema = buildSubgraphSchema({
  typeDefs: itemCartFoodSchema,  // Merge your typeDefs here
  resolvers: itemCartFoodResolver,  // Your resolvers
});

// Create Apollo Server instance
const server = new ApolloServer({
  schema,

  introspection: true, // Allow introspection for localhost
  playground: true,    // Enable GraphQL Playground for localhost
  tracing: false,      // Disable Apollo Studio tracing
  name: "item cart food",
  formatError: (error) => {
    console.error(error); // Log errors for debugging
    return error;
  },
});

async function startServer() {
  // Start the Apollo Server
  await server.start();

  // Apply Apollo Server middleware
  server.applyMiddleware({ app, path: "/graphql" });

  // Start the Express app
  app.listen(PORT, () => {
    console.log(`Item Cart Food service is running on http://localhost:${PORT}/graphql`);
  });
}

startServer();  // Call the async function to start the server
