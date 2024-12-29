const Notification = require("../models/notification-model-file"); // Import the Notification model

// Get all notifications
const getNotifications = async (req, res) => {
  try {
    // Fetch all notifications using Sequelize
    const notifications = await Notification.findAll();

    // Get plain data (not Sequelize instances)
    const notificationsData = notifications.map((notification) =>
      notification.get()
    );

    // Check if there are notifications
    if (notificationsData.length === 0) {
      return res.status(404).json({ message: "No notifications found" });
    }

    res.status(200).json(notificationsData);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

// Create a new notification
const createNotification = async (req, res) => {
  try {
    const { title, message, userId, type } = req.body;

    if (!title || !message || !userId || !type) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create new notification using Sequelize
    const notification = await Notification.create({
      title,
      message,
      userId,
      type,
    });

    res.status(201).json(notification);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

// Update an existing notification
const updateNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, message, type, read } = req.body;

    // Find notification by ID
    const notification = await Notification.findByPk(id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    // Update notification
    notification.title = title || notification.title;
    notification.message = message || notification.message;
    notification.type = type || notification.type;
    notification.read = read !== undefined ? read : notification.read;

    await notification.save();

    res.status(200).json(notification);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

// Delete a notification
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    // Find notification by ID
    const notification = await Notification.findByPk(id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    // Delete notification
    await notification.destroy();

    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
};
