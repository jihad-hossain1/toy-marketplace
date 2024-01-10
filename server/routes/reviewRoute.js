const express = require("express");
const {
  getAllReviews,
  createReview,
  reviewWithReply,
  deleteReply,
  deleteReview,
  updateReview,
  updateReply,
} = require("../controller/reviewsController");

const router = express.Router();

router.post("/products/:productId/createReview", createReview);

router.get("/products/:productId/reviews", getAllReviews);

router.put("/products/:reviewId/reply", reviewWithReply);

router.put("/products/:productId/reviews/:reviewId", updateReview);

router.put(
  "/products/:productId/reviews/:reviewId/replies/:replyId",
  updateReply
);

router.delete("/products/:reviewId/replies/:replyId", deleteReply);

router.delete("/products/:reviewId/review", deleteReview);

module.exports = router;
