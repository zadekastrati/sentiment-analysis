// routes/authRoutes.js
const express = require('express');
const { register, login, getUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register);  // Register a new user
router.post('/login', login);        // Log in the user
router.get('/user', authMiddleware, getUser);

module.exports = router;
