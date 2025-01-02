// routes/interactionRoutes.js
const express = require('express');
const router = express.Router();
const interactionController = require('../controllers/interactionContoller');

// Define routes
router.post('/like', interactionController.likePost); // Route to like a post
router.post('/dislike', interactionController.dislikePost); // Route to dislike a post
router.post('/comment', interactionController.commentOnPost); // Route to comment on a post

module.exports = router;
