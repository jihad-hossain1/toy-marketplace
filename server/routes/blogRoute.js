const express = require("express");
const {
  createBlog,
  getBlogs,
  getBlogById,
  deleteBlog,
} = require("../controller/blogController");

const router = express.Router();

router.route("/blogs").get(getBlogs);

router.route("/blogs/:id").get(getBlogById);

router.route("/blogs").post(createBlog);

router.route("/blogs/:id").delete(deleteBlog);

module.exports = router;
