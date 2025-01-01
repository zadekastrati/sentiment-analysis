const Post = require("../models/postsModel");

const PostsController = {
  // Get all Posts
  async getAllPosts(req, res) {
    try {
      const Posts = await Post.findAll();
      res.status(200).json(Posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get a single Post by ID
  async getPostById(req, res) {
    const { id } = req.params;
    try {
      const post = await Post.findByPk(id); // Rename the variable to 'post'

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).json(post); // Return the post
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create a new Post
  async createPost(req, res) {
    const { title, description, author } = req.body;
    const imgPath = req.file ? req.file.path : null; // Use Multer to get the uploaded file path
  
    try {
      const newPost = await Post.create({
        title,
        description,
        author,
        imgPath, // Save the imgPath in the database
      });
  
      // Return the created post with the full image URL
      res.status(201).json({
        ...newPost.toJSON(),
        imgPath: imgPath ? `http://localhost:5000/${imgPath}` : null,
      });
    } catch (error) {
      console.error("Error creating post:", error.errors ? error.errors : error);
      res.status(500).json({ error: error.message });
    }
  },

  // Update an existing Post
  async updatePost(req, res) {
    const { id } = req.params;
    const { title, description, author } = req.body;
    const imgPath = req.file ? req.file.path : null; // Handle new file upload if it exists
    console.log(req);
    // Log the incoming data
    console.log("Update request for post:", id, title, description, imgPath, author);
  
    try {
      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      // Update only provided fields
      post.title = title || post.title;
      post.description = description || post.description;
      post.author = author || post.author;
  
      // If there's a new image, update the imgPath; otherwise, keep the current image
      post.imgPath = imgPath ? imgPath : post.imgPath;
  
      await post.save();
      res.status(200).json({
        ...post.toJSON(),
        imgPath: imgPath ? `http://localhost:5000/${imgPath}` : post.imgPath,
      });
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ error: error.message });
    }
  },  

  // Delete a Post
  async deletePost(req, res) {
    const { id } = req.params;
    try {
      const post = await Post.findByPk(id); // Rename the variable to 'post'

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      await post.destroy(); // Delete the post
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = PostsController;
