const Comment = require("../models/Comment");

const commentWithReply = async (req, res) => {
  let cid = req.params?.commentId;
  try {
    if (cid) {
      let reply = {
        commentId: cid,
        username: req.body?.username,
        reply: req.body?.reply,
      };

      let newReply = await Comment.findByIdAndUpdate(
        { _id: cid },
        {
          $push: {
            replies: reply,
          },
        },
        {
          new: true,
        }
      );
      //reverse method
      // let replies = newReply?.map((tcomments) => {
      //   return tcomments?.replies?.length > 0
      //     ? tcomments?.replies?.reverse()
      //     : [];
      // });
      // let _brandNewReply = [...newReply, replies];
      // res.json(_brandNewReply);
      res.json(newReply);
    } else {
      res.status(404).json({ message: "comment with id are no match" });
    }
  } catch (error) {
    res.status(401).json({ message: "get taask are problem" });
  }
};

const deleteReply = async (req, res) => {
  const commentId = req.params?.commentId;
  const replyId = req.params?.replyId;

  try {
    if (commentId && replyId) {
      const newReply = await Comment.findByIdAndUpdate(
        { _id: commentId },
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
      res.status(404).json({ message: "comment with id are no match" });
    }
  } catch (error) {
    res.status(401).json({ message: "get taask are problem" });
  }
};

const getAllComments = async (req, res) => {
  // const id = req.body?.taskId;
  const id = req.params?.taskId;

  try {
    if (id) {
      const comments = await Comment.find({ taskId: id }).sort({
        createdAt: "desc",
      });
      res.json(comments);
    } else {
      res.status(404).json({ message: "commentId and taskId are not match " });
    }
  } catch (error) {
    res.status(401).json({ message: "problem with tasks fetch", error: error });
  }
};

const createComment = async (req, res) => {
  const id = req.params?.taskId;
  // const id = req.body?.taskId;
  console.log(req.body);
  try {
    if (id) {
      const create = await Comment.create({
        taskId: id,
        username: req.body?.username,
        comment: req.body?.comment,
      });
      res.status(201).send(create);
    } else {
      res.status(404).json({ message: "taskId are not found" });
    }
  } catch (error) {
    res
      .status(401)
      .json({ message: "getting problem  with server: ", error: error });
  }
};

module.exports = {
  commentWithReply,
  getAllComments,
  deleteReply,
  createComment,
};
