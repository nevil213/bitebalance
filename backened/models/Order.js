const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true }, // Unique ID for each order
  // customerName: { type: String, required: true },          // Name of the customer
  dish: { type: String, required: true },                  // Name of the dish ordered
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 }
  ,      // Quantity of the dish
  date: { type: Date, default: Date.now },                 // Date of the order
  // status: {                                                // Order status
  //   type: String, 
  
});

module.exports = mongoose.model('Order', orderSchema);
