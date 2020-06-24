const express = require('express');
const User = require('../models/userModel');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/authenticate', authController.authenticateUser);

module.exports = router;
