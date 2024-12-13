const express = require('express');
const { Post } = require('../models'); // Adjust the path to your models folder
const router = express.Router();

// Add a new post
router.post('/posts', async (req, res) => {
  try {
    const { imgPath, title, description, ghLink, demoLink } = req.body;
    const newPost = await Post.create({ imgPath, title, description, ghLink, demoLink });
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
