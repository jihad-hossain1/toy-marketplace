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

router.route("/products/:productId/createReview").post(createReview);

router.route("/products/:productId/reviews").post(getAllReviews);

router.route("/products/:reviewId/reply").put(reviewWithReply);

router.route("/products/:productId/reviews/:reviewId").put(updateReview);

router
  .route("/products/:productId/reviews/:reviewId/replies/:replyId")
  .put(updateReply);

router.route("/products/:reviewId/replies/:replyId").delete(deleteReply);

router.route("/products/:reviewId/review").delete(deleteReview);

module.exports = router;
