import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "../../config/db.js";
import { ApolloServer } from "apollo-server-express";
import accountSchema from "./account.schema.js";
import accountResolver from "./account.resolver.js";
import { DateScalar } from "./utils/custom.date.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Kết nối đến cơ sở dữ liệu
connectDB();

// Khởi tạo Apollo Server với schema và resolvers
const server = new ApolloServer({
  typeDefs: accountSchema,
  resolvers: {
    ...accountResolver,
    Date: DateScalar,
  },
  context: ({ req }) => ({
    user: req.user,
  }),
});

// Sử dụng CORS và JSON
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Địa chỉ front-end
      "https://studio.apollographql.com", // Thêm địa chỉ Apollo Studio
    ],
    credentials: true, // Nếu cần hỗ trợ cookie hoặc thông tin xác thực
  })
);
app.use(express.json());

// Middleware để ghi lại yêu cầu
app.use((req, res, next) => {
  next();
});

// Middleware để xử lý lỗi
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Khởi động Apollo Server
await server.start();
server.applyMiddleware({ app, path: "/graphql/api/account" });

// Khởi động ứng dụng Express
app.listen(PORT, () => {
  console.log(
    `Account service is running on http://localhost:${PORT}/graphql/api/account`
  );
});
