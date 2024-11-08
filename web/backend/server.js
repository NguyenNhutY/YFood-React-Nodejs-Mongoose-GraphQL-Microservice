import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js"; // Đảm bảo đường dẫn chính xác
import { ApolloServer } from "apollo-server-express";
import accountRoute from "./modules/account/account.route.js";


import "dotenv/config";

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

connectDB().then(() => {

  app.use("/api/account", accountRoute);

});

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
