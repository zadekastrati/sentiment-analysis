const express = require("express");
const {
  getMessages,
  createMessage,
  updateMessage,
  deleteMessage,
} = require("../controllers/contact-us-controller-file"); 

const router = express.Router();

router.get("/contact-us", getMessages);

router.post("/contact-us", createMessage);

router.put("/contact-us/:id", updateMessage);

router.delete("/contact-us/:id", deleteMessage);

module.exports = router;
