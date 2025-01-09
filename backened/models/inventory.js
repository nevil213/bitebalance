const mongoose = require('mongoose');
const inventorySchema = new mongoose.Schema({
    ingredientName: { type: String, required: true, unique: true }, // Name of the ingredient
    stock: { type: Number, required: true, min: 0 },               // Current stock level
    unit: { type: String, required: true },                        // Unit of measurement (e.g., kg, l)
    threshold: { type: Number, required: true, min: 0 },           // Minimum stock level before alert
    lastUpdated: { type: Date, default: Date.now }                 // Last updated timestamp
  });
  
  module.exports = mongoose.model('Inventory', inventorySchema);
  