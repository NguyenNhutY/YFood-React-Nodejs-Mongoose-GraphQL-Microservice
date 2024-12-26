import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from '../../config/db.js';  // Ensure the correct path
import { ApolloServer } from "apollo-server-express";
import roleSchema from './role.schema.js';  // Import material schema
import rolenResolver from "./role.resolver.js"; // Material batch resolvers
import {buildSubgraphSchema} from "@apollo/subgraph"
import { ApolloServerPluginInlineTraceDisabled } from 'apollo-server-core';

const app = express();
const PORT = process.env.PORT || 4010;

// Connect to the database
connectDB();  // Ensure correct database connection logic

// Define the schema using buildFederatedSchema for Federation
const schema = buildSubgraphSchema({
  typeDefs: [roleSchema], // Merge your typeDefs here
  resolvers: {
    ...rolenResolver,  // Your resolvers
  },
});

// Create Apollo Server instance
const server = new ApolloServer({
  schema,
  introspection: true, // Giữ introspection để có thể truy vấn schema từ localhost
  playground: true,    // Bật GraphQL Playground ở localhost
  tracing: false,      // Tắt Apollo Studio tracing 
  name: "role",  plugins: [
    ApolloServerPluginInlineTraceDisabled(),
  ],
  formatError: (error) => {
    console.error(error); // Log errors for debugging
    return error;
  }
});

// Configure CORS
app.use(
  cors({
    origin: true,  // Enable CORS for all origins (or specify frontend URL)
    credentials: true, // Enable session handling with credentials
  })
);

// Middleware for error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the Apollo Server
await server.start();
server.applyMiddleware({ app, path: "/graphql" }); // Use the /graphql endpoint

// Start the Express app
app.listen(PORT, () => {
  console.log(`Role Permison service is running on http://localhost:${PORT}/graphql`);
});
