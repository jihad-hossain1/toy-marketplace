const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  replies: [
    {
      username: {
        type: String,
        required: true,
      },
      commentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      reply: {
        type: String,
        required: true,
      },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

module.exports = Comment;
