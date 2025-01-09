// const Inventory = require('../models/inventorySchema');
// const Notification = require('../models/notificationSchema');
const db = require('../database');
const Inventory = require('../models/inventory');

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
    const { ingredientName, newStock } = req.body;

    const inventoryItem = await Inventory.findOne({ ingredientName });
    if (!inventoryItem) {
      return res.status(404).json({ error: `${ingredientName} not found in inventory.` });
    }

    inventoryItem.stock = newStock;
    inventoryItem.lastUpdated = new Date();

    // Clear low-stock notification if stock is now sufficient
    if (inventoryItem.stock >= inventoryItem.threshold) {
      await Notification.findOneAndDelete({ ingredientName });
    }

    await inventoryItem.save();
    res.status(200).json(inventoryItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// module.exports = {

// }
