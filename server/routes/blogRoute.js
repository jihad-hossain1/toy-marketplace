const express = require("express");
const {
  createBlog,
  getBlogs,
  getBlogById,
  deleteBlog,
} = require("../controller/blogController");

const router = express.Router();

router.get("/blogs", getBlogs);

router.get("/blogs/:id", getBlogById);

router.post("/blogs", createBlog);

router.delete("/blogs/:id", deleteBlog);

module.exports = router;
