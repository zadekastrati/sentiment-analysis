const express = require("express");
const NotificationsController = require("../controllers/notificationsController");

const router = express.Router();

// Routes
router.get("/", NotificationsController.getAllNotifications);
router.get("/:id", NotificationsController.getNotificationById);
router.post("/", NotificationsController.createNotification);
router.put("/:id", NotificationsController.updateNotification);
router.delete("/:id", NotificationsController.deleteNotification);

module.exports = router;
