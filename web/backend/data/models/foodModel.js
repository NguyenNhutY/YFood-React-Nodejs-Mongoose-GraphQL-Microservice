import mongoose from "mongoose"; // Corrected import from "mongose" to "mongoose"

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  _id: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }, // Corrected typo from "requred" to "required"
  image: { type: String, required: true },
  category: { type: String, required: true },
  metail_1: { type: String, required: false },
  metail_2: { type: String, required: false },
  metail_3: { type: String, required: false },
  metarial: { type: String, required: false },

  // material_name: { type: String, required: true },
});

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;
