const Post = require("../models/postsModel");

const PostsController = {
  async getAllPosts(req, res) {
    try {
      const Posts = await Post.findAll();
      res.status(200).json(Posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getPostById(req, res) {
    const { id } = req.params;
    try {
      const post = await Post.findByPk(id); 

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).json(post); 
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async createPost(req, res) {
    const { title, description, author } = req.body;
    const imgPath = req.file ? req.file.path : null; 
  
    try {
      const newPost = await Post.create({
        title,
        description,
        author,
        imgPath, 
      });
  
      res.status(201).json({
        ...newPost.toJSON(),
        imgPath: imgPath ? `http://localhost:5000/${imgPath}` : null,
      });
    } catch (error) {
      console.error("Error creating post:", error.errors ? error.errors : error);
      res.status(500).json({ error: error.message });
    }
  },

  async updatePost(req, res) {
    const { id } = req.params;
    const { title, description, author } = req.body;
    const imgPath = req.file ? req.file.path : null;
    console.log(req);
    console.log("Update request for post:", id, title, description, imgPath, author);
  
    try {
      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      post.title = title || post.title;
      post.description = description || post.description;
      post.author = author || post.author;
  
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

  async deletePost(req, res) {
    const { id } = req.params;
    try {
      const post = await Post.findByPk(id); 

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      await post.destroy();
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = PostsController;
