// models/blogModel.js
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, required: true },
  image: { type: String, required: true },
  likes: { type: Number, default: 0, required: true },
});

const BlogPost = mongoose.model("BlogPost", blogSchema);
blogSchema.index({ title: "text", content: "text" });
export default BlogPost;
