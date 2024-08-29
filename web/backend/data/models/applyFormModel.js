import mongoose from "mongoose";

const applyFormJobSchema = new mongoose.Schema({
  _id: { type: "String", required: true },
  name: { type: "String", required: true },
  file: { type: "Array", required: true },
  ressume: { type: "String", required: true },
  phone: { type: "String", required: true },
  email: { type: "String", required: true },
  jobTitle: { type: "String", required: true },
  jobDescription: { type: "String", required: true },
  createdAt: { type: "Date", required: true },
  status: { type: "String", required: true },
});

const applyFormJobModel =
  mongoose.model.applyFormJobModel ||
  mongoose.model("applyFormJob", applyFormJobSchema);

export default applyFormJobModel;
