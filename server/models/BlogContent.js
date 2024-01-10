const mongoose = require("mongoose");

const blogContentSchema = mongoose.Schema({
  content: {
    type: String,
  },
});

const BlogContent =
  mongoose.models.BlogContent ||
  mongoose.model("BlogContent", blogContentSchema);

module.exports = BlogContent;
