const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  category: String,
  condition: String,
  age: String,
  about: String,
  images: [String]
});

module.exports = mongoose.model("Product", productSchema);
