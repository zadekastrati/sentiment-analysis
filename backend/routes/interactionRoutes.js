const express = require('express');
const router = express.Router();
const interactionController = require('../controllers/interactionContoller');

router.post('/like', interactionController.likePost); 
router.post('/dislike', interactionController.dislikePost); 
router.post('/comment', interactionController.commentOnPost); 

module.exports = router;
