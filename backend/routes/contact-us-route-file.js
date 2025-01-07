const express = require("express");
const {
  getAllMessages,
  getMessageById, // Added this for consistency if needed
  createMessage,
  updateMessage,
  deleteMessage,
<<<<<<< HEAD
} = require("../controllers/contact-us-controller-file");

const router = express.Router();

// Routes
router.get("/", getAllMessages); // Fetch all contact messages
router.get("/:id", getMessageById); // Fetch a specific contact message by ID (optional)
router.post("/", createMessage); // Create a new contact message
router.put("/:id", updateMessage); // Update an existing contact message
router.delete("/:id", deleteMessage); // Delete a specific contact message
=======
} = require("../controllers/contact-us-controller-file"); 

const router = express.Router();

router.get("/contact-us", getMessages);

router.post("/contact-us", createMessage);

router.put("/contact-us/:id", updateMessage);

router.delete("/contact-us/:id", deleteMessage);
>>>>>>> 8c7ca18a8763856340358623c55a60caa04d1bc4

module.exports = router;
