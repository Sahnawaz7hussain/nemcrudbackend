const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  note: { type: String, required: true },
  createdAt: { type: Date, time: new Date() },
  authorId: { type: String, required: true },
});

const BlogModel = mongoose.model("blog", blogSchema);

module.exports = { BlogModel };
