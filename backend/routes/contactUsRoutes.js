const express = require("express");
const {
  getMessages,
  createMessage,
  updateMessage,
  deleteMessage,
} = require("../controllers/contact-us-controller-file"); // Importoni controllerat

const router = express.Router();

// Route për të marrë të gjitha mesazhet
router.get("/contact-us", getMessages);

// Route për të krijuar një mesazh të ri
router.post("/contact-us", createMessage);

// Route për të përditësuar një mesazh ekzistues
router.put("/contact-us/:id", updateMessage);

// Route për të fshirë një mesazh
router.delete("/contact-us/:id", deleteMessage);

module.exports = router;
