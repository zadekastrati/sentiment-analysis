const express = require("express");
const {
  getAllNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
} = require("../controllers/notification-controller-file");

const router = express.Router();

// Route to fetch all notifications
router.get("/", getAllNotifications); // Fixed the route here

// Route to create a new notification
router.post("/", createNotification);

// Route to update an existing notification
router.put("/:id", updateNotification);

// Route to delete a notification
router.delete("/:id", deleteNotification);

module.exports = router;
