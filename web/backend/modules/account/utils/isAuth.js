import jwt from "jsonwebtoken";
import { ApolloError } from "apollo-server-errors";
import dotenv from "dotenv";
const blacklist = new Set();

const isAuthenticated = (req, res, next) => {
  console.log("Request Headers:", req.headers);
  const token = req.headers.authorization?.split(" ")[1];

  // Kiểm tra nếu không có token
  if (!token) {
    console.error("No token provided");
    throw new ApolloError("No token provided. Unauthorized", {
      extensions: { code: "UNAUTHENTICATED" },
    });
  }

  // Kiểm tra nếu token đã logout
  if (blacklist.has(token)) {
    console.error("Token is blacklisted");
    throw new ApolloError("Session expired. Please log in again.", {
      extensions: { code: "UNAUTHENTICATED" },
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.account = decoded; // Lưu thông tin tài khoản vào req.account
    console.log("Account: ", decoded);
    next(); // Tiến đến middleware tiếp theo
  } catch (error) {
    console.error("Token verification failed:", error);
    // Kiểm tra loại lỗi để cung cấp thông tin chi tiết hơn
    if (error.name === "JsonWebTokenError") {
      throw new ApolloError("Invalid token", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    } else if (error.name === "TokenExpiredError") {
      throw new ApolloError("Token has expired", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    } else {
      throw new ApolloError("Unauthorized", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    }
  }
};

// Hàm để thêm token vào blacklist
const addToBlacklist = (token) => {
  blacklist.add(token);
};

export { isAuthenticated, addToBlacklist };
