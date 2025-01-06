const Comment = require('../models/commentsModel');
const CommentsController = {
  async addComment(req, res) {
    const { postId, userId, commentText } = req.body;
    try {
      if (!commentText || commentText.trim() === '') {
        return res.status(400).json({ message: 'Comment text is required' });
      }

      const newComment = await Comment.create({ post_id: postId, user_id: userId, comment: commentText });
      res.status(201).json(newComment);
    } catch (error) {
      console.error('Error in addComment:', error);
      res.status(500).json({ message: 'Error adding comment', error: error.message });
    }
  },

  async getCommentsByPost(req, res) {
    const { postId } = req.params;
    try {
      const comments = await Comment.findAll({ where: { post_id: postId } });
      if (comments.length === 0) {
        return res.status(404).json({ message: 'No comments found for this post' });
      }
      res.status(200).json(comments);
    } catch (error) {
      console.error('Error in getCommentsByPost:', error);
      res.status(500).json({ message: 'Error fetching comments', error: error.message });
    }
  },  

  async updateComment(req, res) {
    const { id } = req.params;
    const { commentText } = req.body;
    try {
      const comment = await Comment.findByPk(id);
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      comment.comment = commentText;
      await comment.save();
      res.status(200).json(comment);
    } catch (error) {
      console.error('Error in updateComment:', error);
      res.status(500).json({ message: 'Error updating comment', error: error.message });
    }
  },

  async deleteComment(req, res) {
    const { id } = req.params;
    try {
      const comment = await Comment.findByPk(id);
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      await comment.destroy();
      res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
      console.error('Error in deleteComment:', error);
      res.status(500).json({ message: 'Error deleting comment', error: error.message });
    }
  },
};

module.exports = CommentsController;
