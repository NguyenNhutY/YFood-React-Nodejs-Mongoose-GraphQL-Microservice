// resolvers.js
import { ApolloError } from "apollo-server-express"; // Đừng quên import ApolloError
import Food from "../food/food.model.js";
import Cart from "../cart/cart.model.js"
import ItemCartFood from "./item_cart_food.model.js";

const foodResolver = {
  Query: {
    listItemCartFood: async (_, args) => {
      try {
        // Truy vấn danh sách ItemCartFood
        const result = await ItemCartFood.find({}); // Populate để lấy dữ liệu Food
        console.log("Result from DB:", result); // Kiểm tra kết quả trả về

        // Nếu không tìm thấy dữ liệu
        if (!result || result.length === 0) {
          return {
            success: true,
            message: "No Item Cart Food found",
            datas: [],
            data: null,
            dataFood: null,
          };
        }
    
        // Trả về dữ liệu đầy đủ
        return {
          success: true,
          message: "List Item Cart Food Successfully",
          datas: result,
          data: result[0], // Lấy mục đầu tiên trong danh sách
          dataFood: result[0].food_id || null, // Nếu có Food liên kết
        };
      } catch (error) {
        // Xử lý lỗi
        return {
          success: false,
          message: `Error fetching item cart food: ${error.message}`,
          datas: [],
          data: null,
          dataFood: null,
        };
      }
    },
    
    
    
    getItemCartFoodById: async (_, { _id }) => {
      const result = await ItemCartFood.find({ _id: _id });
      if(!result){
        throw new ApolloError("Couldn't find Item Cart Food By ID");
      }
      return{
        success:true,
        message:"Item Cart Food by ID Successfully",
        data:result,
      }
    },
    getItemCartFoodByCartId: async (_, { id }) => {
      const cart = await Cart.findId({_id: _id});
      if(!cart){
        throw new ApolloError("Couldn't find Cart")
      }
      const result = await ItemCartFood.find({ cart_id: id });
      if(!result){
        throw new ApolloError("Couldn't find Item Cart Food By Cart Id");
      }
      return{
        success:true,
        message:"Item Cart Food by Cart ID Successfully",
        data:result,
      }
    },
    getItemCartFoodByFoodId: async (_, { _id }) => {
      const food = await Food.findId({_id: _id});
      if(!food){
        throw new ApolloError("Couldn't find Food")
      }
      const result = await ItemCartFood.find({ food_id: id });
      if(!result){
        throw new ApolloError("Couldn't find Item Cart Food By Food Id");
      }
      return{
        success:true,
        message:"Item Cart Food by Food ID Successfully",
        data:result,
        dataFood:{
          name:food.name
        }
      }
    },
    getItemCartFoodByFoodName: async (_, { name }) => {
      const food = await ItemCartFood.find({ name: name });
      if(!food){
        throw new ApolloError("Food not found");
      }
      return await ItemCartFood.find({food_id:food.id});
    }
  },
  Mutation: {
    addItemCartFood: async (_, { food_id, cart_id }) => {
      try {
        // Verify if the food and cart exist
        const food = await Food.findById(food_id);
        if (!food) {
          throw new ApolloError("Food not found");
        }
        const cart = await Cart.findById(cart_id);
        if (!cart) {
          throw new ApolloError("Cart not found");
        }
  
        // Check if the item already exists in the cart
        let itemCartFood = await ItemCartFood.findOne({ food_id, cart_id });
  
        if (itemCartFood) {
          // Increment quantity and adjust price
          itemCartFood.quantity += 1;
          itemCartFood.price = food.price * itemCartFood.quantity;
        } else {
          // Create a new cart item
          itemCartFood = new ItemCartFood({
            food_id,
            cart_id,
            quantity: 1,
            price: food.price, // Initial price set to food price
          });
        }
  
        // Save the cart item
        const saveItemCartFood = await itemCartFood.save();
        if (!saveItemCartFood) {
          throw new ApolloError("Failed to add item to cart");
        }
  
        return { success: true, message: "Item added to cart successfully" ,data:saveItemCartFood };
      } catch (error) {
        throw new ApolloError("Error adding item to cart", "ADD_ITEM_ERROR", { error });
      }
    },
  deleteItemCartFood:async (_,{food_id})=>{
    const itemCartFood = await ItemCartFood.findByIdAndDelete(food_id);
    if(!itemCartFood){
      throw new ApolloError("Item not found");
    }
    return {success:true, message:"Item deleted from cart successfully"};
  },
  decreaseItemCartFood: async (_, { food_id }) => {
    try {
      // Find the item first
      const itemCartFood = await ItemCartFood.findById(food_id);
      if (!itemCartFood) {
        throw new ApolloError("Item not found");
      }
  
      // Decrease quantity or remove item if quantity is 1
      if (itemCartFood.quantity <= 1) {
        await itemCartFood.remove();
        return { success: true, message: "Item removed from cart" };
      } else {
        itemCartFood.quantity -= 1;
  
        // Adjust the price if applicable (example logic)
        itemCartFood.price = itemCartFood.price * (itemCartFood.quantity / (itemCartFood.quantity + 1));
  
        const updatedItem = await itemCartFood.save();
        return {
          success: true,
          message: "Item quantity decreased successfully",
          item: updatedItem,
        };
      }
    } catch (error) {
      throw new ApolloError("Failed to decrease item quantity", "DECREASE_ITEM_ERROR", { error });
    }
  }
}
}

export default foodResolver;
