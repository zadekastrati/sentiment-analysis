// routes/authRoutes.js
const express = require('express');
const { register, login, getUser } = require('../controllers/authController');
const {updateUser,deleteUser}=require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', (req, res, next) => {
    console.log("Register route hit");  // Add a log here
    next();  // Continue to the actual handler
  }, register);
router.post('/login', login);        // Log in the user
router.get('/user', authMiddleware, getUser);

router.put('/user/:user_id', authMiddleware, updateUser);
router.delete('/user/:user_id', authMiddleware, deleteUser);

module.exports = router;    
