const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema({
    ingredientName: { type: String, required: true },   // Name of the ingredient
    stock: { type: Number, required: true },           // Current stock level
    threshold: { type: Number, required: true },       // Alert threshold level
    message: { type: String, required: true },         // Notification message
    date: { type: Date, default: Date.now }            // Date of the notification
  });
  
  module.exports = mongoose.model('Notification', notificationSchema);
  