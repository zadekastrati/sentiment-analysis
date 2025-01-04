const express = require("express");
const {
  getNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
} = require("../controllers/notification-controller-file");

const router = express.Router();

// Route to fetch all notifications
router.get("/notifications", getNotifications);

// Route to create a new notification
router.post("/notifications", createNotification);

// Route to update an existing notification
router.put("/notifications/:id", updateNotification);

// Route to delete a notification
router.delete("/notifications/:id", deleteNotification);

module.exports = router;
