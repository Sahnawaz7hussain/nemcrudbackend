const express = require("express");
const {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blogController");

const blogRoute = express.Router();

blogRoute.get("/", getBlogs);

blogRoute.post("/create", createBlog);

blogRoute.patch("/edit/:blogId", updateBlog);

blogRoute.delete("/delete/:blogId", deleteBlog);

module.exports = { blogRoute };
