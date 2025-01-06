const { ContactUs } = require("../models/contactUsModel"); // Sigurohuni që modeli është i importuar

// Get all messages (from the 'contact_us' table)
const getMessages = async (req, res) => {
  try {
    // Fetch all messages from the database
    const messages = await ContactUs.findAll();

    // If no messages are found, return a 404
    if (messages.length === 0) {
      return res.status(404).json({ message: "No messages found" });
    }

    // Return the messages
    res.status(200).json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

// Create a new contact message
const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create the new message in the database
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

// Update an existing contact message
const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, message } = req.body;

    // Find the message by its ID
    const messageToUpdate = await ContactUs.findByPk(id);

    // If no message is found, return a 404
    if (!messageToUpdate) {
      return res.status(404).json({ message: "Message not found" });
    }

    // Update the message with the new data
    messageToUpdate.name = name || messageToUpdate.name;
    messageToUpdate.email = email || messageToUpdate.email;
    messageToUpdate.message = message || messageToUpdate.message;

    // Save the updated message
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

// Delete a contact message
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the message by its ID
    const messageToDelete = await ContactUs.findByPk(id);

    // If no message is found, return a 404
    if (!messageToDelete) {
      return res.status(404).json({ message: "Message not found" });
    }

    // Delete the message
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
