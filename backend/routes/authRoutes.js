const express = require('express');
const { register, login, getUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

<<<<<<< HEAD
router.post('/register', (req, res, next) => {
    console.log("Register route hit");  // Add a log here
    next();  // Continue to the actual handler
  }, register);
router.post('/login', login);        // Log in the user
=======
router.post('/register', register);  
router.post('/login', login);  
>>>>>>> 3df9ba2b52f3f04b7a8a1525a143ce9cd6fac075
router.get('/user', authMiddleware, getUser);

module.exports = router;
