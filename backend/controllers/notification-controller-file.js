const Notification = require("../models/notification-model-file");

const NotificationsController = {
  async getAllNotifications(req, res) {
    try {
      const notifications = await Notification.findAll();
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

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

  async createNotification(req, res) {
    const { title, message, users_id, type } = req.body;
    try {
      if (!title || !message || !users_id || !type) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const newNotification = await Notification.create({
        title,
        message,
        users_id,
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

  async updateNotification(req, res) {
    const { id } = req.params;
    const { title, message, type, read } = req.body;

    try {
      const notification = await Notification.findByPk(id);

      if (!notification) {
        return res.status(404).json({ message: "Notification not found" });
      }

      notification.title = title || notification.title;
      notification.message = message || notification.message;
      notification.type = type || notification.type;
      notification.read = read !== undefined ? read : notification.read;

      await notification.save();
      res.status(200).json(notification);
    } catch (error) {
      console.error("Error updating notification:", error);
      res.status(500).json({ error: error.message });
    }
  },

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
