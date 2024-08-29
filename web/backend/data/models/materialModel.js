import mongoose from "mongoose"; // Corrected import from "mongose" to "mongoose"

const materialSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  weight: { type: Number, required: true },
  supplier: { type: String, required: true },
});

const materialModel =
  mongoose.models.material || mongoose.model("material", materialSchema);

export default materialModel;
