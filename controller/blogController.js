const { BlogModel } = require("../models/blogModel");

const getBlogs = async (req, res) => {
  let { userId } = req.body;
  try {
    let blogs = await BlogModel.find({ authorId: userId });
    res.send(blogs);
  } catch (err) {
    console.log("err: ", err);
    res.send("SomeThing went wrong...");
  }
};

// create new blog.
const createBlog = async (req, res) => {
  try {
    let { title, note, userId } = req.body;
    let newblogadded = BlogModel({ title, note, authorId: userId });
    await newblogadded.save();
    res.status(201).send({ message: "Created success", newBlog: newblogadded });
  } catch (err) {
    console.log("err", err);
    res.send("Error found to post new blog");
  }
};

// update the blog.
const updateBlog = async (req, res) => {
  try {
    let { blogId } = req.params;
    let toEditData = req.body;
    let editDone = await BlogModel.findByIdAndUpdate(
      { _id: blogId },
      toEditData
    );
    console.log(blogId, " ___", editDone);
    res.send("update blog done");
  } catch (err) {
    console.log("err to edit the blog: ", err);
    res.send("Something went wrong...to edit the blogs.");
  }
};

// delete the blog
const deleteBlog = async (req, res) => {
  try {
    let { blogId } = req.params;
    let deleteData = await BlogModel.findByIdAndDelete({ _id: blogId });
    res.send({ massage: "blog deleted successfully", blog: deleteData });
  } catch (err) {
    console.log("failed to delete the blog: ", err);
    res.send("something went wrong. to delete the blog.");
  }
};

module.exports = { getBlogs, createBlog, updateBlog, deleteBlog };
