const { ContactUs } = require("../models/contact-us-model-file"); 

const getMessages = async (req, res) => {
  try {
    const messages = await ContactUs.findAll();

    if (messages.length === 0) {
      return res.status(404).json({ message: "No messages found" });
    }

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
    }

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
    }

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
    const { id } = req.params;

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
};

module.exports = {
  getMessages,
  createMessage,
  updateMessage,
  deleteMessage,
};
