const mongoose = require("mongoose");
const user = require("./user");

const articleSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
  },
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
  },
  description: {
    type: String,
    minLength: 3,
    maxLength: 300,
  },
  content: {
    type: String,
    minLength: 3,
    maxLength: 1000,
  },
  url: {
    type: String,
  },
  img: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Article", articleSchema);
