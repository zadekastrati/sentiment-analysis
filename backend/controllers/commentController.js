const { Comment, User, Post } = require('../models');

module.exports = {
  // Create a new comment
  createComment: async (req, res) => {
    try {
      const { post_id, user_id, content } = req.body;
      const comment = await Comment.create({ post_id, user_id, content });
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all comments for a post
  getCommentsByPost: async (req, res) => {
    try {
      const { postId } = req.params;
      const comments = await Comment.findAll({
        where: { post_id: postId },
        include: [
          { model: User, as: 'user', attributes: ['username'] },
          { model: Post, as: 'post', attributes: ['content'] },
        ],
      });
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a comment
  updateComment: async (req, res) => {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const [updated] = await Comment.update({ content }, { where: { id } });
      if (!updated) return res.status(404).json({ message: 'Comment not found' });
      const updatedComment = await Comment.findByPk(id);
      res.status(200).json(updatedComment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a comment
  deleteComment: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Comment.destroy({ where: { id } });
      if (!deleted) return res.status(404).json({ message: 'Comment not found' });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
