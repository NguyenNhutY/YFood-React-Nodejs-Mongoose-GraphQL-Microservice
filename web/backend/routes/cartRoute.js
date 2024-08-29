import express, { Request, Response, NextFunction } from "express";
import {
  getCart,
  updateCartItemQuantity,
  clearCart,
  applyCoupon,
  getCouponDiscount,
  getCartTotalPrice,
  applyLoyaltyProgram,
  getLoyaltyProgramDiscount,
  getCartItemsByCategory,
  getCartItemsByPriceRange,
  getCartItemsByRating,
  getCartItemsByBrand,
  getCartItemsByAvailability,
  getCartItemsByPopularity,
  getCartItemsByNewness,
  getCartItemsBySales,
  getCartItemsBySavings,
  getCartItemsByDeliveryFee,
  getCartItemsByPaymentMethod,
  getCartItemsByOrderStatus,
  getCartItemsByCustomerId,
  getTotalCartAmount,
  getCartItemCount,
  decreaseToCart,
  addToCart,
  removeFromCart,
} from "../controllers/cartController";
import authMiddleware from "../middlewares/auth";

// Define request and response types for middleware

const cartRoute = express.Router();

// Define routes
cartRoute.post("/add", authMiddleware, () => addToCart(req, res, next));
cartRoute.post("/remove", authMiddleware, () => removeFromCart(req, res, next));
cartRoute.get("/", authMiddleware, () => getCart(req, res, next));
cartRoute.post("/decrease", authMiddleware, () =>
  decreaseToCart(req, res, next)
);
cartRoute.get("/total-amount", authMiddleware, () =>
  getTotalCartAmount(req, res, next)
);
cartRoute.get("/item-count", authMiddleware, () =>
  getCartItemCount(req, res, next)
);

// Additional routes based on provided functions
cartRoute.post("/update-item-quantity", authMiddleware, () =>
  updateCartItemQuantity(req, res, next)
);
cartRoute.post("/clear", authMiddleware, () => clearCart(req, res, next));
cartRoute.post("/apply-coupon", authMiddleware, () =>
  applyCoupon(req, res, next)
);
cartRoute.get("/coupon-discount", authMiddleware, () =>
  getCouponDiscount(req, res, next)
);
cartRoute.get("/total-price", authMiddleware, () =>
  getCartTotalPrice(req, res, next)
);
cartRoute.post("/apply-loyalty-program", authMiddleware, () =>
  applyLoyaltyProgram(req, res, next)
);
cartRoute.get("/loyalty-program-discount", authMiddleware, () =>
  getLoyaltyProgramDiscount(req, res, next)
);
cartRoute.get("/items-by-category", authMiddleware, () =>
  getCartItemsByCategory(req, res, next)
);
cartRoute.get("/items-by-price-range", authMiddleware, () =>
  getCartItemsByPriceRange(req, res, next)
);
cartRoute.get("/items-by-rating", authMiddleware, () =>
  getCartItemsByRating(req, res, next)
);
cartRoute.get("/items-by-brand", authMiddleware, () =>
  getCartItemsByBrand(req, res, next)
);
cartRoute.get("/items-by-availability", authMiddleware, () =>
  getCartItemsByAvailability(req, res, next)
);
cartRoute.get("/items-by-popularity", authMiddleware, () =>
  getCartItemsByPopularity(req, res, next)
);
cartRoute.get("/items-by-newness", authMiddleware, () =>
  getCartItemsByNewness(req, res, next)
);
cartRoute.get("/items-by-sales", authMiddleware, () =>
  getCartItemsBySales(req, res, next)
);
cartRoute.get("/items-by-savings", authMiddleware, () =>
  getCartItemsBySavings(req, res, next)
);
cartRoute.get("/items-by-delivery-fee", authMiddleware, () =>
  getCartItemsByDeliveryFee(req, res, next)
);
cartRoute.get("/items-by-payment-method", authMiddleware, () =>
  getCartItemsByPaymentMethod(req, res, next)
);
cartRoute.get("/items-by-order-status", authMiddleware, () =>
  getCartItemsByOrderStatus(req, res, next)
);
cartRoute.get("/items-by-customer-id", authMiddleware, () =>
  getCartItemsByCustomerId(req, res, next)
);

export default cartRoute;
