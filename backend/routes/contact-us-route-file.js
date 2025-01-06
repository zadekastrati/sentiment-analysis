const express = require("express");
const {
  getAllMessages,
  getMessageById, // Added this for consistency if needed
  createMessage,
  updateMessage,
  deleteMessage,
} = require("../controllers/contact-us-controller-file");

const router = express.Router();

// Routes
router.get("/", getAllMessages); // Fetch all contact messages
router.get("/:id", getMessageById); // Fetch a specific contact message by ID (optional)
router.post("/", createMessage); // Create a new contact message
router.put("/:id", updateMessage); // Update an existing contact message
router.delete("/:id", deleteMessage); // Delete a specific contact message

module.exports = router;
