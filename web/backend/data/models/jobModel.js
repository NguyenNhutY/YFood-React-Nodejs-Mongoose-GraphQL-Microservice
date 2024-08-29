import mongoose from "mongoose"; // Corrected import from "mongose" to "mongoose"

const jobSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  salary: { type: Number, required: true },
  location: { type: String, required: true },
  experience: { type: Number, required: true },
  level: { type: String, required: true },

  // material_name: { type: String, required: true },
});

const jobModel = mongoose.models.job || mongoose.model("job", jobSchema);

export default jobModel;
