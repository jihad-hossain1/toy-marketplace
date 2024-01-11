const Blog = require("../models/Blog");
const BlogContent = require("../models/BlogContent");

const createBlog = async (req, res) => {
  console.log(req.body);
  try {
    const _content = new BlogContent(req.body.contents);

    const saveContent = await _content.save();

    const newBlog = new Blog({
      ...req.body,
      contents: saveContent._id,
    });
    const saveBlog = await newBlog.save();

    res.json(saveBlog);
  } catch (error) {
    res.status(404).json({ message: `failed to create blog : ${error}` });
  }
};

const getBlogs = async (req, res) => {
  //
  try {
    const blogs = await Blog.find({});

    res.json(blogs);
  } catch (error) {
    res.status(404).json({ message: `failed to fetch blog : ${error}` });
  }
};

const getBlogById = async (req, res) => {
  //
  const uid = req.params?.id;
  try {
    const blog = await Blog.findById(uid).populate("content");
    if (!blog) {
      return res.status(404).json({ error: "blog not found" });
    }
    res.json(blog);
  } catch (error) {
    res.status(404).json({ message: `failed to fetch single blog : ${error}` });
  }
};
const deleteBlog = async (req, res) => {
  //
  try {
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId).populate("contents");
    if (!blog) {
      return res.status(404).json({ error: "blog not found" });
    }

    await BlogContent.findByIdAndDelete(blog.contents);

    const deleteBlog = await Blog.findByIdAndDelete(blogId);
    // console.log(deleteBlog);
    res.status(200).json({ message: "blog delete Succcessfull", deleteBlog });
  } catch (error) {
    res.status(401).json({
      message: "problem wiht geting blog from server",
      error: error?.message,
    });
  }
};

module.exports = { createBlog, getBlogs, getBlogById, deleteBlog };
