const express = require("express");
const router = express.Router();

const OrderController = require('../controllers/orders.controllers');

router.post('/api/orderData', OrderController.orderData);

module.exports = router;