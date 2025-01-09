const express = require('express');
const router = express.Router();
const CommentsController = require('../controllers/commentController');

router.get('/', async (req, res) => {
    try {
      const comments = await Comment.findAll();
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching comments', error: error.message });
    }
  });
  
router.post('/', CommentsController.createComment);
router.get('/:postId', CommentsController.getCommentsByPost);
router.put('/:id', CommentsController.updateComment);
router.delete('/:id', CommentsController.deleteComment);

module.exports = router;
