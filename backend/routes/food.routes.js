const express = require('express');
const router = express.Router();

const foodController = require('../controllers/food.controller');

router.get('/api/items', foodController.foodItems);
router.get('/api/categories', foodController.foodCategories);

module.exports = router;