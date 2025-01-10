const db = require('../database');
const Inventory = require('../models/inventory');
const Notification = require('../models/Notification');

// Get Inventory Status
exports.getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Inventory (Restock)
exports.updateInventory = async (req, res) => {
  try {
    const { _id, stock, threshold } = req.body;

    const inventoryItem = await Inventory.findOne({ _id });
    if (!inventoryItem) {
      return res.status(404).json({ error: `selected item not found in inventory.` });
    }

    inventoryItem.stock = stock;
    inventoryItem.threshold = threshold;
    inventoryItem.lastUpdated = new Date();

    // Clear low-stock notification if stock is now sufficient
    if (inventoryItem.stock >= inventoryItem.threshold) {
      await Notification.findOneAndDelete({ ingredientName: inventoryItem.ingredientName });
    }

    await inventoryItem.save();
    res.status(200).json(inventoryItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
