// controllers/interactionController.js
const Likes = require('../models/likesModel');
const Dislikes = require('../models/dislikesModel');
const Comments = require('../models/commentsModel');

// Like a post
exports.likePost = async (req, res) => {
  const { postId, userId } = req.body; // Get postId and userId from request body
  try {
    // Check if the user has already liked the post
    const existingLike = await Likes.findOne({
      where: { postId, userId }
    });

    if (existingLike) {
      return res.status(400).json({ message: 'Post already liked' });
    }

    // Create a new like
    const newLike = await Likes.create({ postId, userId });
    res.status(201).json(newLike);
  } catch (error) {
    res.status(500).json({ message: 'Error liking the post', error });
  }
};

// Dislike a post
exports.dislikePost = async (req, res) => {
  const { postId, userId } = req.body; // Get postId and userId from request body
  try {
    // Check if the user has already disliked the post
    const existingDislike = await Dislikes.findOne({
      where: { postId, userId }
    });

    if (existingDislike) {
      return res.status(400).json({ message: 'Post already disliked' });
    }

    // Create a new dislike
    const newDislike = await Dislikes.create({ postId, userId });
    res.status(201).json(newDislike);
  } catch (error) {
    res.status(500).json({ message: 'Error disliking the post', error });
  }
};

// Add a comment to a post
exports.commentOnPost = async (req, res) => {
  const { postId, userId, commentText } = req.body; // Get postId, userId, and commentText from request body
  try {
    // Create a new comment
    const newComment = await Comments.create({ postId, userId, text: commentText });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error });
  }
};
