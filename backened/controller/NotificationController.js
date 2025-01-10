// const Notification = require('../models/notificationSchema');
const db = require('../database');
const Notification = require("../models/Notification");

// Get All Notifications
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Clear a Notification
exports.clearNotification = async (req, res) => {
  try {
    const ingredientName = req.params['name'];
    console.log(req.params)

    const deletedNotification = await Notification.findOneAndDelete({ ingredientName });
    if (!deletedNotification) {
      return res.status(404).json({ error: `No notification found for ${ingredientName}.` });
    }

    res.status(200).json({ message: `Notification for ${ingredientName} cleared.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
