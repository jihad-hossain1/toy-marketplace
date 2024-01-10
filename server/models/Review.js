const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  content: {
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
      reviewId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

module.exports = Review;
