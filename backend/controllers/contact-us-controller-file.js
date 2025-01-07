<<<<<<< HEAD
const ContactUs = require("../models/contact-us-model-file");

const ContactUsController = {
  // Get all Messages
  async getAllMessages(req, res) {
    try {
      const messages = await ContactUs.findAll();
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
=======
const { ContactUs } = require("../models/contact-us-model-file"); 

const getMessages = async (req, res) => {
  try {
    const messages = await ContactUs.findAll();

    if (messages.length === 0) {
      return res.status(404).json({ message: "No messages found" });
>>>>>>> 8c7ca18a8763856340358623c55a60caa04d1bc4
    }
  },

<<<<<<< HEAD
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
=======
    res.status(200).json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
>>>>>>> 8c7ca18a8763856340358623c55a60caa04d1bc4
    }
  },

<<<<<<< HEAD
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
=======
    const newMessage = await ContactUs.create({
      name,
      email,
      message,
    });

    res.status(201).json({
      message: "Your message has been sent successfully",
      data: newMessage,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, message } = req.body;

    const messageToUpdate = await ContactUs.findByPk(id);

    if (!messageToUpdate) {
      return res.status(404).json({ message: "Message not found" });
>>>>>>> 8c7ca18a8763856340358623c55a60caa04d1bc4
    }
  },

<<<<<<< HEAD
  // Delete a Message
  async deleteMessage(req, res) {
=======
    messageToUpdate.name = name || messageToUpdate.name;
    messageToUpdate.email = email || messageToUpdate.email;
    messageToUpdate.message = message || messageToUpdate.message;

    await messageToUpdate.save();

    res.status(200).json({
      message: "Message updated successfully",
      data: messageToUpdate,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

const deleteMessage = async (req, res) => {
  try {
>>>>>>> 8c7ca18a8763856340358623c55a60caa04d1bc4
    const { id } = req.params;
    try {
      const messageToDelete = await ContactUs.findByPk(id);

<<<<<<< HEAD
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
=======
    const messageToDelete = await ContactUs.findByPk(id);

    if (!messageToDelete) {
      return res.status(404).json({ message: "Message not found" });
    }

    await messageToDelete.destroy();

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
>>>>>>> 8c7ca18a8763856340358623c55a60caa04d1bc4
};

module.exports = ContactUsController;