const express = require("express");
const {
  commentWithReply,
  getAllComments,
  deleteReply,
  createComment,
} = require("../controller/commentsController");

const router = express.Router();

router.post("/tasks/:taskId/createComment", createComment);

router.get("/tasks/:taskId/comments", getAllComments);

router.put("/tasks/:commentId/reply", commentWithReply);

router.delete("/tasks/:commentId/replies/:replyId", deleteReply);

module.exports = router;
