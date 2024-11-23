import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from '../../config/db.js';  // Ensure the correct path
import { ApolloServer } from "apollo-server-express";
import foodSchema from './food.schema.js';  // Import material schema
import foodResolver from "./food.resolver.js"; // Material batch resolvers
import { buildSubgraphSchema } from "@apollo/subgraph";
import { GraphQLUpload, graphqlUploadExpress } from 'graphql-upload';

const app = express();
const PORT = process.env.PORT || 4004;

// Connect to the database
connectDB();  // Ensure correct database connection logic

// Define the schema using buildFederatedSchema for Federation
const schema = buildSubgraphSchema({
  typeDefs: [foodSchema], // Merge your typeDefs here
  resolvers: {
    Upload: GraphQLUpload, // Ensure the Upload scalar is registered
    ...foodResolver,  // Your resolvers
  },
  uploads: {
    maxFileSize: 10000000, // Max file size 10MB
    maxFiles: 10, // Max files
  },
});

// Create Apollo Server instance
const server = new ApolloServer({
  schema,
  introspection: true, // Allow introspection for localhost
  playground: true,    // Enable GraphQL Playground for localhost
  tracing: false,      // Disable Apollo Studio tracing
  name: "food",
  formatError: (error) => {
    console.error(error); // Log errors for debugging
    return error;
  },
});

// Apply middleware for file uploads (before applying Apollo Server)
app.use(graphqlUploadExpress());  // This middleware handles file uploads

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
server.applyMiddleware({ app, path: "/graphql" }); // Use /graphql endpoint

// Start the Express app
app.listen(PORT, () => {
  console.log(`Material service is running on http://localhost:${PORT}/graphql`);
});
