const Likes = require('../models/likesModel');
const Dislikes = require('../models/dislikesModel');
const Comments = require('../models/commentsModel');

exports.likePost = async (req, res) => {
  const { postId, userId } = req.body;
  try {
    console.log('Request Body:', req.body);

    const existingLike = await Likes.findOne({
      where: { post_id: postId, user_id: userId }
    });

    if (existingLike) {
      await Likes.destroy({
        where: { post_id: postId, user_id: userId }
      });
      return res.status(200).json({ message: 'Like removed' });
    }

    const newLike = await Likes.create({ post_id: postId, user_id: userId });
    res.status(201).json(newLike);
  } catch (error) {
    console.error('Error in likePost:', error); 
    res.status(500).json({ message: 'Error liking the post', error: error.message });
  }
};

exports.dislikePost = async (req, res) => {
  const { postId, userId } = req.body; 
  try {
    const existingDislike = await Dislikes.findOne({
      where: { post_id: postId, user_id: userId }
    });

    if (existingDislike) {
      await Dislikes.destroy({
        where: { post_id: postId, user_id: userId }
      });
      return res.status(200).json({ message: 'Dislike removed' });
    }

    const newDislike = await Dislikes.create({ post_id: postId, user_id: userId });
    res.status(201).json(newDislike);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Error disliking the post', error });
  }
};

exports.commentOnPost = async (req, res) => {
  const { postId, userId, commentText } = req.body; 
  try {
    // Ensure commentText is provided
    if (!commentText || commentText.trim() === '') {
      return res.status(400).json({ message: 'Comment text is required' });
    }

    // Create a new comment
    const newComment = await Comments.create({ post_id: postId, user_id: userId, comment: commentText });
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error in commentOnPost:', error); // Log the full error object
    res.status(500).json({ message: 'Error adding comment', error: error.message || error });
  }
};
