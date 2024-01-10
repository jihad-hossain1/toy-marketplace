const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  contents: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BlogContent",
  },
  shortContent: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    default: "Admin",
  },
  createdAt: { type: Date, default: Date.now },
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

module.exports = Blog;
