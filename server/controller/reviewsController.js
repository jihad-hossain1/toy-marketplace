const Comment = require("../models/Comment");
const Review = require("../models/Review");

const reviewWithReply = async (req, res) => {
  let rid = req.params?.reviewId;
  const { username, content, reviewId } = req.body;
  try {
    if (rid) {
      let newReply = await Review.findByIdAndUpdate(
        { _id: rid },
        {
          $push: {
            replies: { reviewId, username, content },
          },
        },
        {
          new: true,
        }
      );

      res.json(newReply);
    } else {
      res.status(404).json({ message: "review with id are no match" });
    }
  } catch (error) {
    res.status(401).json({ message: "get reply with are problem" });
  }
};

const deleteReply = async (req, res) => {
  const reviewId = req.params?.reviewId;
  const replyId = req.params?.replyId;

  try {
    if (reviewId && replyId) {
      const newReply = await Review.findByIdAndUpdate(
        { _id: reviewId },
        {
          $pull: {
            replies: { _id: replyId },
          },
        },
        {
          new: true,
        }
      );

      res.json(newReply);
    } else {
      res.status(404).json({ message: "review with id are no match" });
    }
  } catch (error) {
    res.status(401).json({ message: "you got are problem from server" });
  }
};

const getAllReviews = async (req, res) => {
  // const id = req.body?.taskId;
  const id = req.params?.productId;

  try {
    if (id) {
      const reviews = await Review.find({ productId: id }).sort({
        createdAt: "desc",
      });
      res.json(reviews);
    } else {
      res
        .status(404)
        .json({ message: "reviewId and productId are not match " });
    }
  } catch (error) {
    res
      .status(401)
      .json({ message: "problem with product fetch", error: error });
  }
};

const createReview = async (req, res) => {
  const id = req.params?.productId;
  // const id = req.body?.productId;
  console.log(req.body);
  try {
    if (id) {
      const create = await Review.create({
        productId: id,
        username: req.body?.username,
        content: req.body?.content,
      });
      res.status(201).send(create);
    } else {
      res.status(404).json({ message: "productId are not found" });
    }
  } catch (error) {
    res
      .status(401)
      .json({ message: "getting problem  with server: ", error: error });
  }
};

const deleteReview = async (req, res) => {
  const reviewId = req.params?.reviewId;
  try {
    const deleteReview = await Review.findByIdAndDelete(reviewId);
    res.json(deleteReview);
  } catch (error) {
    res
      .status(401)
      .json({ message: "getting problem  with server: ", error: error });
  }
};

const updateReview = async (req, res) => {
  const reviewId = req.params?.reviewId;
  const productId = req.params?.productId;
  const { content } = req.body;

  // console.log(content);
  try {
    if (productId && reviewId) {
      const _updt = await Review.findByIdAndUpdate(
        reviewId,
        { content },
        { new: true }
      );

      if (!_updt) {
        return res.status(404).json({ message: "review are not found" });
      }

      res.json(_updt);
    } else {
      res.status(404).json({ message: "ProductId are not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "getting problem  with server: ", error: error });
  }
};

const updateReply = async (req, res) => {
  const { productId, replyId, reviewId } = req.params;
  const { content } = req.body;

  try {
    if (productId && replyId && replyId) {
      const updatedReviewReply = await Review.findOneAndUpdate(
        { _id: reviewId, "replies._id": replyId },
        { $set: { "replies.$.content": content } },
        { new: true }
      );
      if (!updatedReviewReply) {
        return res
          .status(404)
          .json({ message: "some thing error happen please try again" });
      }

      res.json(updatedReviewReply);
    } else {
      res.status(404).json({
        message: "your are not provide: productId or replyId or reviewId",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "getting problem  with server: ", error: error });
  }
};

module.exports = {
  reviewWithReply,
  getAllReviews,
  deleteReply,
  createReview,
  deleteReview,
  updateReview,
  updateReply,
};
