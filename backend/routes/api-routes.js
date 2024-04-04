const express = require('express');
const router = express.Router();

const SignUpRoutes = require('./signUp.routes');
const AuthRoutes = require('./auth.routes');
const FoodRoutes = require('./food.routes');
const OrderRoutes = require('./orders.routes');

router.use(SignUpRoutes);
router.use(AuthRoutes);
router.use(FoodRoutes);
router.use(OrderRoutes);

module.exports = router;