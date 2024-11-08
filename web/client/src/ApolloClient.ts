// src/ApolloClient.js
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql/api/account", // Thay bằng URL của GraphQL API của bạn
  cache: new InMemoryCache(),
});

export default client;
