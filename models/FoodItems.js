const mongoose = require("mongoose");

const foodItemsSchema = new mongoose.Schema({
  imageURL: String,
  name: String,
  price: Number,
  category: String,
});

const FoodItem = mongoose.model("FoodItem", foodItemsSchema);

module.exports = FoodItem;
