const express = require("express");
const {
  createBlog,
  getBlogs,
  getBlogById,
} = require("../controller/blogController");

const router = express.Router();

router.get("/blogs", getBlogs);

router.get("/blogs/:id", getBlogById);

router.post("/blogs", createBlog);

module.exports = router;
