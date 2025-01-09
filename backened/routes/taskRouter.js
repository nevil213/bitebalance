const express = require('express');
const { getNotifications } = require('../controller/NotificationController');
const { getAllOrders, placeOrder } = require('../controller/orderController');
const { getmenu } = require('../controller/MenuController');
const { getInventory } = require('../controller/InventoryController');
const router = express.Router();

// router.use(express.json());
// Controllers
// const orderController = require('../controller/orderController');
// const { placeOrder,getAllOrders} = require('../controller/orderController');

// const {getInventory,updateInventory,} = require('../controller/InventoryController');
// const {getNotifications,clearNotification} = require('../controller/NotificationController');
// const orderController = require('../controller/orderController');
router.post('/orderplaced',placeOrder);

router.get('/menu',getmenu);

router.get('/adminorders',getAllOrders);

router.get('/inventory',getInventory);


router.get('/fetch',getNotifications)
router.get('/', (req, res) => {
    res.send('API is running');
  });

module.exports = router;
