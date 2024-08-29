// models/commentModel.js
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  author: String,
  content: String,
  date: { type: Date, default: Date.now },
  blogPost: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" }, // Tham chiếu tới BlogPost
  likes: { type: Number, default: 0 },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], // Tham chiếu tới các trả l��i của bình luận này
  repliesCount: { type: Number, default: 0 }, // Số lượng trả l��i của bình luận này
  isReply: { type: Boolean, default: false }, // Xác đ��nh đây là trả l��i hay bình luận chính của bài viết
  isDeleted: { type: Boolean, default: false }, // Xác đ��nh đây là bình luận đã xóa hay chưa
  isSpam: { type: Boolean, default: false }, // Xác đ��nh đây là bình luận đã phát cảm hay chưa
  isModerated: { type: Boolean, default: false }, // Xác đ��nh đây là bình luận đã duyệt hay chưa
  isHighlighted: { type: Boolean, default: false }, // Xác đ��nh đây là bình luận đã được đánh dấu đâu đó trong bài viết
});

const CommentModel = mongoose.model("comment", commentSchema);

export default CommentModel;
