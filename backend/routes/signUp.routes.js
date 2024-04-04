const express = require('express');
const router = express.Router();

const SignUpController = require('../controllers/signUp.controller');

router.post('/api/signUp', SignUpController.createUser);

module.exports = router;