const ContactUs = require("../models/contact-us-model-file");

const ContactUsController = {
  // Get all Messages
  async getAllMessages(req, res) {
    try {
      const messages = await ContactUs.findAll();
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get a single Message by ID
  async getMessageById(req, res) {
    const { id } = req.params;
    try {
      const message = await ContactUs.findByPk(id);

      if (!message) {
        return res.status(404).json({ message: "Message not found" });
      }

      res.status(200).json(message);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create a new Message
  async createMessage(req, res) {
    const { name, email, message } = req.body;

    try {
      if (!name || !email || !message) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const newMessage = await ContactUs.create({
        name,
        email,
        message,
      });

      res.status(201).json(newMessage);
    } catch (error) {
      console.error("Error creating message:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Update an existing Message
  async updateMessage(req, res) {
    const { id } = req.params;
    const { name, email, message } = req.body;

    try {
      const messageToUpdate = await ContactUs.findByPk(id);

      if (!messageToUpdate) {
        return res.status(404).json({ message: "Message not found" });
      }

      // Update only provided fields
      messageToUpdate.name = name || messageToUpdate.name;
      messageToUpdate.email = email || messageToUpdate.email;
      messageToUpdate.message = message || messageToUpdate.message;

      await messageToUpdate.save();
      res.status(200).json(messageToUpdate);
    } catch (error) {
      console.error("Error updating message:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a Message
  async deleteMessage(req, res) {
    const { id } = req.params;
    try {
      const messageToDelete = await ContactUs.findByPk(id);

      if (!messageToDelete) {
        return res.status(404).json({ message: "Message not found" });
      }

      await messageToDelete.destroy();
      res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
      console.error("Error deleting message:", error);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = ContactUsController;