import mongoose from "mongoose";

const CategoriesSchema = new mongoose.Schema({
  _id: { type: "String", required: true },
  name: { type: "String", required: true },
  image: { type: "String", required: true },
  // foods: [{ type: mongoose.Schema.Types.ObjectId, ref: "Food" }],
  // foods: [{ type: mongoose.Schema.Types.ObjectId, ref: "Food" }],
  foods: [{ type: mongoose.Schema.Types.ObjectId, ref: "Food" }],
});

const CategoriesbModel =
  mongoose.model.CategoriesSchema ||
  mongoose.model("Categories", CategoriesbModel);

export default CategoriesbModel;
