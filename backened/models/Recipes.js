const mongoose = require('mongoose');
const recipeSchema = new mongoose.Schema({
    dishName: { type: String, required: true, unique: true },
    ingredients: [
      {
        ingredientName: { type: String, required: true },
        quantity: { type: Number, required: true, min: 0 },
        unit: { type: String, required: true },
      }
    ],

    price : {
        type: Number,
        required: true,
        min: 0
    }
  });
  
  module.exports = mongoose.model('Recipe', recipeSchema);