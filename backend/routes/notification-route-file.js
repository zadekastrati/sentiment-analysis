const express = require("express");
const {
  getAllNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
} = require("../controllers/notification-controller-file");

const router = express.Router();

router.get("/", getAllNotifications); 

router.post("/", createNotification);

router.put("/:id", updateNotification);

router.delete("/:id", deleteNotification);

module.exports = router;
