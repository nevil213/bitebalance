const db = require('../database');

const inventory = require ('../models/inventory');
const order = require ('../models/Order');
const Recipes = require('../models/Recipes');
const Notification = require('../models/Notification');
// const Notification = require('../models/notificationSchema');

// Place a New Order
exports.placeOrder = async (req, res) => {
  try {
    const { orderId, dish, quantity, price } = req.body;
  
    // Check if recipe exists for the dish
    const recipe = await Recipes.findOne({ dishName: dish });
    if (!recipe) {
      return res.status(404).json({ error: `Recipe for ${dish} not found.` });
    }

    // Check inventory and update stock
    for (const ingredient of recipe.ingredients) {
      const inventoryItem = await inventory.findOne({ ingredientName: ingredient.ingredientName });

      if (!inventoryItem) {
        return res.status(404).json({ error: `Ingredient ${ingredient.ingredientName} not found in inventory.` });
      }

      const requiredStock = ingredient.quantity * quantity; // Ingredient needed for the order
      if (inventoryItem.stock < requiredStock) {
        return res.status(400).json({ error: `Insufficient stock for ${ingredient.ingredientName}.` });
      }

      // Deduct the stock
      inventoryItem.stock -= requiredStock;
      inventoryItem.lastUpdated = new Date();
      // console.log('shahil');
      console.log(inventoryItem.stock);
      // Update low-stock notifications
      if (inventoryItem.stock < inventoryItem.threshold) {
        // res.send(`Stock for ${inventoryItem.ingredientName} is below threshold.`);
        console.log('shahil');
        const existingNotification = await Notification.findOne({ ingredientName: ingredient.ingredientName });

        if (!existingNotification) {
          await Notification.create({
            ingredientName: inventoryItem.ingredientName,
            stock: inventoryItem.stock,
            threshold: inventoryItem.threshold,
            message: `${inventoryItem.ingredientName} stock is below threshold. Please restock.`,
          });
        }
      }

      // Save inventory changes
      await inventoryItem.save();
    }

    // Save the order
    const newOrder = await order.create({ orderId, dish, quantity });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await order.find().sort({ date: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
