const express = require("express");
const multer = require("multer");
const PostsController = require("../controllers/postsController");

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to store uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG and PNG are allowed."), false);
    }
  },
});

// Routes
router.get("/", PostsController.getAllPosts);
router.get("/:id", PostsController.getPostById);
router.post("/", upload.single("imgPath"), PostsController.createPost);
router.put("/:id", upload.single("imgPath"), PostsController.updatePost);
router.delete("/:id", PostsController.deletePost);

module.exports = router;
