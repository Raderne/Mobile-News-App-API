const mongoose = require("mongoose");

const connectDB = async (url) => {
  return mongoose.connect(url).then(() => {
    console.log("connected to DB... on ");
  });
};

module.exports = connectDB;
