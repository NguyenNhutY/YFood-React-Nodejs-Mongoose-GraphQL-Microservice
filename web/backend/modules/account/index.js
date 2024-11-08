import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "../../config/db.js";
import { ApolloServer } from "apollo-server-express";
import accountSchema from "./account.schema.js";
import accountResolver from "./account.resolver.js";
import { DateScalar } from "./utils/custom.date.js";
import session from "express-session"; // Đảm bảo sử dụng express-session thay vì session

const app = express();
const PORT = process.env.PORT || 3001;

// Kết nối đến cơ sở dữ liệu
connectDB();

// Sử dụng express-session để lưu trữ session
app.use(
  session({
    secret: "your-secret-key", // Thay đổi secret key cho session của bạn
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" }, // Thiết lập cookie cho bảo mật
  })
);

// Khởi tạo Apollo Server với schema và resolvers
const server = new ApolloServer({
  typeDefs: accountSchema,
  resolvers: {
    ...accountResolver,
    Date: DateScalar,
  },
  // Sửa lại phần context để nhận đối tượng req
  context: ({ req }) => ({
    session: req.session, // Truyền session vào context Apollo từ req.session
    user: req.session.token ? jwt.decode(req.session.token) : null, // Giải mã token từ session nếu có
  }),
});

// Sử dụng CORS và JSON
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Địa chỉ front-end
      "https://studio.apollographql.com", // Thêm địa chỉ Apollo Studio
    ],
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
