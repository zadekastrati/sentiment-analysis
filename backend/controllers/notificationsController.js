const Notification = require("../models/notificationsModel");

const NotificationsController = {
  // Get all Notifications
  async getAllNotifications(req, res) {
    try {
      const notifications = await Notification.findAll();
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get a single Notification by ID
  async getNotificationById(req, res) {
    const { id } = req.params;
    try {
      const notification = await Notification.findByPk(id);

      if (!notification) {
        return res.status(404).json({ message: "Notification not found" });
      }

      res.status(200).json(notification);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create a new Notification
  async createNotification(req, res) {
    const { title, message, userId, type } = req.body;

    try {
      const newNotification = await Notification.create({
        title,
        message,
        userId,
        type,
      });

      res.status(201).json(newNotification);
    } catch (error) {
      console.error(
        "Error creating notification:",
        error.errors ? error.errors : error
      );
      res.status(500).json({ error: error.message });
    }
  },

  // Update an existing Notification
  async updateNotification(req, res) {
    const { id } = req.params;
    const { title, message, userId, type, read } = req.body;

    try {
      const notification = await Notification.findByPk(id);
      if (!notification) {
        return res.status(404).json({ message: "Notification not found" });
      }

      // Update only provided fields
      notification.title = title || notification.title;
      notification.message = message || notification.message;
      notification.userId = userId || notification.userId;
      notification.type = type || notification.type;
      notification.read = typeof read === "boolean" ? read : notification.read;

      await notification.save();
      res.status(200).json(notification);
    } catch (error) {
      console.error("Error updating notification:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a Notification
  async deleteNotification(req, res) {
    const { id } = req.params;
    try {
      const notification = await Notification.findByPk(id);

      if (!notification) {
        return res.status(404).json({ message: "Notification not found" });
      }

      await notification.destroy();
      res.status(200).json({ message: "Notification deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = NotificationsController;
