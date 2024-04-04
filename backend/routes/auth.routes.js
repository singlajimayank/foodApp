const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.controller');

router.post('/api/login', AuthController.login);

module.exports = router;