// model logic for Folder17
import mongoose from "mongoose"

const itemCartFoodSchema = new mongoose.Schema({
    food_id:{type:mongoose.Schema.Types.ObjectId,ref:"Food",required:"false",},
    cart_id:{type:mongoose.Schema.Types.ObjectId,ref:"Cart",required:"false",},
    quantity:{type:Number,required:"true",default:1},
    price:{type:Number,required:"true",default:0}
})

const ItemCartFood = mongoose.models.itemCartFoodSchema || mongoose.model("TtemCartFood", itemCartFoodSchema)

export default ItemCartFood