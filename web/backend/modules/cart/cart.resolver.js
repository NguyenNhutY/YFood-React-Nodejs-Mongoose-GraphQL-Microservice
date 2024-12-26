import Cart from "./cart.model.js";
import Customer from "../user/user.model.js"; // Import Customer schema
import ItemCartFood from "../item_cart/item_cart_food.model.js"; // Import
import { ApolloError } from "apollo-server-express"; // Đừng quên import ApolloError

export const cartResolver = {
  Query: {

    async getCarts(_,{}){
        try {
          const carts = await Cart.find({});
          return {
            datas: carts,
            success:true,
            message: "Carts fetched successfully."
          };
        } catch (error) {
          console.error("Error fetching carts:", error);
          throw new ApolloError("Could not fetch carts.");
        }
      },
    async getCartById(_,{_id}) {
        try {
          const cart = await Cart.findById(_id)
          if (!cart) {
            throw new ApolloError("Cart not found.");
          }
          return cart;
        } catch (error) {
          console.error("Error fetching cart by ID:", error);
          throw new ApolloError("Could not fetch cart.");
        }
    },
    getCartbyCustomerID: async (_, { customerId }) => {
        const cart = await Cart.findOne({ customer_id: customerId }).populate('items.foodItem');
        if (!cart) {
          return { items: [], totalAmount: 0, discount: 0, totalAfterDiscount: 0 };
        }
        const totalAmount = cart.items.reduce((sum, item) => sum + item.foodItem.price * item.quantity, 0);
        const totalAfterDiscount = totalAmount - totalAmount * cart.discount;
        return {
          items: cart.items,
          totalAmount,
          discount: cart.discount,
          totalAfterDiscount,
        };
      },
  },
  Mutation: {
    addToCart: async (_, { accountID, role_account }) => {
        try {
            if(accountID == null){
                throw new ApolloError("Account ID is required", "CUSTOMER_ID_REQUIRED");
            }

            if (role_account ==="employee"){

            }else{

            }
          // Kiểm tra khách hàng có tồn tại hay không
          const customer = await Customer.findOne({ account_id: accountID });
          if (!customer) {
            throw new ApolloError("Customer does not exist", "CUSTOMER_NOT_FOUND");
          }
      
          // Kiểm tra giỏ hàng có tồn tại hay không
          let cart = await Cart.findOne({ customer_id: customerId });
      
          if (!cart) {
            // Tạo giỏ hàng mới nếu chưa tồn tại
            cart = new Cart({
              customer_id: customerId,
              quantity: 0, // Số lượng mặc định là 0
            });
      
            await cart.save();
          }
      
          // Trả về giỏ hàng (cũ hoặc mới tạo)
          return {
            success: true,
            message: cart ? "Cart retrieved successfully" : "Cart created successfully",
            cart,
          };
        } catch (error) {
          // Xử lý lỗi
          throw new ApolloError("Error adding to cart", "ADD_TO_CART_ERROR", {
            error,
          });
        }
      },
      
      removeFromCart: async (_, { customerId, foodId }) => {
        const cart = await Cart.findOne({ customer_id: customerId });
        if (!cart) {
          throw new Error('Cart not found');
        }
  
        // Remove the item from cart
        cart.items = cart.items.filter(item => item.foodItem.toString() !== foodId);
        await cart.save();
        return cart;
      },
      async  decreaseQuantity(_,{customerId, foodId}) {
        const cart = await Cart.findOne({ customer_id: customerId });

      
        const itemIndex = cart.items.findIndex(item => item.foodId === foodId);
        if (itemIndex > -1) {
          const currentItem = cart.items[itemIndex];
          if (currentItem.quantity > 1) {
            cart.items[itemIndex].quantity -= 1;
          } else {
            cart.items.splice(itemIndex, 1);
          }
          await cart.save();
          return cart.items;
        }
        throw new Error('Item not found in cart');
      },
      updateQuantity: async (_, { customerId, cartId }) => {
        const cart = await Cart.findOne({ customer_id: customerId });
        if (!cart) {
          throw new Error('Cart not found');
        }
        const itemCartFood = await ItemCartFood.findById({cart_id: cartId});
      if (!itemCartFood) {
        throw new ApolloError("ItemCartFood not found");
      }


  
        await cart.save();
        return cart;
      },
  },
  Cart: {
    async Cart(cart) {
      try {
        const customer = await Customer.findById(cart.customer_id);
        return customer;
      } catch (error) {
        console.error("Error fetching customer:", error);
        return null;
      }
    },
  },
};

export default cartResolver;
