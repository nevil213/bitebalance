const db = require('../database');
const Menu = require('../models/Menu');
const Recipe = require('../models/Recipes');
// const Notification = require("../models/Notification");

// Get All Notifications
exports.getmenu = async (req, res) => {
  try {
    const notifications = await Menu.find();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.savedish = async (req, res) => {
  console.log(req.body);
    try {
        const data = req.body;
        const newRecipe = await Recipe.create(
        {
            dishName: data.dishName,
            ingredients: data.ingredients[0],
            price: data.price,
        });
         console.log(newRecipe);

        const newMenu = await Menu.create(
        {
            name: req.body.dishName,
            price: req.body.price,
        }
        );
    
      res.status(200).json(newRecipe);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message });
    }
  };