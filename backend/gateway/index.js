const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();

app.use(cors());
app.use(express.json());

// Định tuyến yêu cầu đến dịch vụ customer
app.use("/customer", proxy("http://localhost:8001"));

// Định tuyến yêu cầu đến dịch vụ product
app.use("/product", proxy("http://localhost:8003")); // Bạn có thể điều chỉnh cổng nếu cần

// Định tuyến yêu cầu đến dịch vụ quizs
app.use("/quizs", proxy("http://localhost:8004"));

// Định tuyến yêu cầu đến dịch vụ blogs
app.use("/blogs", proxy("http://localhost:8005"));

// Định tuyến yêu cầu đến dịch vụ career
app.use("/career", proxy("http://localhost:8006"));

// Định tuyến yêu cầu gốc đến dịch vụ chính (dịch vụ quản lý products)
app.use("/", proxy("http://localhost:8002"));

app.listen(8000, () => {
  console.log("Gateway is Listening on Port 8000");
});
