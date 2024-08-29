import userModel from "../data/models/userModel.js";

// Add a new item to the cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // Kiểm tra xem userId có được cung cấp không
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    // Kiểm tra xem itemId có được cung cấp không
    if (!itemId) {
      return res.status(400).json({ error: "itemId is required" });
    }

    // Tìm người dùng
    let userData = await userModel.findById(req.body.userId);
    console.log("User Data", userData); // Log dữ liệu người dùng để kiểm tra

    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }
    // Cập nhật giỏ hàng
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    // Lưu dữ liệu giỏ hàng
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    // Trả về kết quả thành công
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while updating cart data" });
  }
};

//remove item
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      delete cartData[req.body.itemId];
      await userModel.findByIdAndUpdate(req.body.userId, { cartData });
      res.json({ success: true, message: "Removed from cart" });
    }
    res.json({ success: true, message: "Item not found in cart" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "User not found" });
  }
};

//fetch!user cart data
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.params.userId);
    let cartData = userData.cartData;
    res.json({ success: true, data: cartData });
  } catch (err) {
    return res.status(500).json({ success: false, message: "User not found" });
  }
};
//update cart item quantity
// const updateCartItemQuantity = async (req, res) => {};
// //clear cart
// const clearCart = async (req, res) => {};
// //get cart total price
// const getCartTotalPrice = async (req, res) => {};
// //get cart total items
// const getCartTotalItems = async (req, res) => {};
// //get cart items
// const getCartItems = async (req, res) => {};
// //checkout cart
// const checkoutCart = async (req, res) => {};
// //apply coupon code to cart
// const applyCouponCode = async (req, res) => {};
// //remove coupon code from cart
// const removeCouponCode = async (req, res) => {};
// //get user's favorite items
// const getFavoriteItems = async (req, res) => {};
// //add item to favorite
// const addToFavorite = async (req, res) => {};

const decreaseToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // Kiểm tra xem userId có được cung cấp không
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    // Kiểm tra xem itemId có được cung cấp không
    if (!itemId) {
      return res.status(400).json({ error: "itemId is required" });
    }

    // Tìm người dùng
    let userData = await userModel.findById(req.body.userId);
    console.log("User Data", userData); // Log dữ liệu người dùng để kiểm tra

    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }
    // Cập nhật giỏ hàng
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] -= 1;
    }
    // Lưu dữ liệu giỏ hàng
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    // Trả về kết quả thành công
    res.json({ success: true, message: "Decreased to cart" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while updating cart data" });
  }
};
const getTotalCartAmount = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    let totalAmount = 0;
    for (let item in cartData) {
      totalAmount += cartData[item] * itemModel.findById(item).price;
    }
    res.json({ success: true, data: totalAmount });
  } catch (err) {
    return res.status(500).json({ success: false, message: "User not found" });
  }
};

const getCartItemCount = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    let totalItems = 0;
    for (let item in cartData) {
      totalItems += cartData[item];
    }
    res.json({ success: true, data: totalItems });
  } catch (err) {
    return res.status(500).json({ success: false, message: "User not found" });
  }
};

// //remove item from favorite
// const removeFromFavorite = async (req, res) => {};
// //get user's recent orders
// const getRecentOrders = async (req, res) => {};
// //get user's order history
// const getOrderHistory = async (req, res) => {};
// //get user's order details
// const getOrderDetails = async (req, res) => {};
// //get user's order status
// const getOrderStatus = async (req, res) => {};
// //update user's order status
// const updateOrderStatus = async (req, res) => {};
// //cancel user's order
// const cancelOrder = async (req, res) => {};
// //get user's order tracking details
// const getOrderTrackingDetails = async (req, res) => {};
// //get user's address
// const getAddress = async (req, res) => {};
// //add new address
// const addAddress = async (req, res) => {};
// //update user's address
// const updateAddress = async (req, res) => {};
// //remove user's address
// const removeAddress = async (req, res) => {};
// //get user's payment methods
// const getPaymentMethods = async (req, res) => {};
// //add new payment method
// const addPaymentMethod = async (req, res) => {};
// //update user's payment method
// const updatePaymentMethod = async (req, res) => {};
// //remove user's payment method
// const removePaymentMethod = async (req, res) => {};
// //get user's delivery options
// const getDeliveryOptions = async (req, res) => {};
// //update user's delivery option
// const updateDeliveryOption = async (req, res) => {};
// //get user's notification settings
// const getNotificationSettings = async (req, res) => {};
// //update user's notification settings
// const updateNotificationSettings = async (req, res) => {};
// //get user's order preferences
// const getOrderPreferences = async (req, res) => {};
// //update user's order preferences
// const updateOrderPreferences = async (req, res) => {};

export {
  addToCart,
  removeFromCart,
  getCart,
  decreaseToCart,
  getTotalCartAmount,
  getCartItemCount,
  //   updateCartItemQuantity,
  //   clearCart,
  //   getCartTotalPrice,
  //   getCartTotalItems,
  //   getCartItems,
  //   checkoutCart,
  //   decreaseToCart,
  //   applyCouponCode,
  //   removeCouponCode,
  //   getFavoriteItems,
  //   addToFavorite,
  //   removeFromFavorite,
  //   getRecentOrders,
  //   getOrderHistory,
  //   getOrderDetails,
  //   getOrderStatus,
  //   updateOrderStatus,
  //   cancelOrder,
  //   getOrderTrackingDetails,
  //   getAddress,
  //   addAddress,
  //   updateAddress,
  //   removeAddress,
  //   getPaymentMethods,
  //   addPaymentMethod,
  //   updatePaymentMethod,
  //   removePaymentMethod,
  //   getDeliveryOptions,
  //   updateDeliveryOption,
  //   getNotificationSettings,
  //   updateNotificationSettings,
  //   getOrderPreferences,
  //   updateOrderPreferences,
};
