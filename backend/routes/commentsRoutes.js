const express = require('express');
const router = express.Router();
const CommentsController = require('../controllers/commentsController');

router.get('/', async (req, res) => {
    try {
      const comments = await Comments.findAll();
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching comments', error: error.message });
    }
  });
  
router.post('/', CommentsController.addComment);
router.get('/:postId', CommentsController.getCommentsByPost);
router.put('/:id', CommentsController.updateComment);
router.delete('/:id', CommentsController.deleteComment);

module.exports = router;
