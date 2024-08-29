import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js"; // Đảm bảo đường dẫn chính xác
import foodRoute from "./routes/foodRoute.js"; // Đường dẫn tương đối từ file `server.js`

import blogRoute from "./routes/blogRoute.js";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoute.js";
import cartRoute from "./routes/cartRoute.js";

import "dotenv/config";

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

connectDB().then(() => {
  // Sau khi kết nối thành công, thiết lập các middleware và routes
  app.use("/api/blogs", blogRoute);
  app.use("/api/foods", foodRoute);
  app.use("/images", express.static("uploads"));
  app.use("/api/users", userRoute);
  app.use("/api/carts", cartRoute);
  app.use("/api/orders", orderRoute);
});

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
