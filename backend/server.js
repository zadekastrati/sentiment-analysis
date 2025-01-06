<<<<<<< HEAD
require("dotenv").config();
console.log("JWT Secret:", process.env.JWT_SECRET);

const sequelize = require("./config/db"); // Import Sequelize instance
const app = require("./app"); // Import app.js
const http = require("http");
const WebSocket = require("ws");

const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

// WebSocket setup
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("WebSocket connection established");

  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
    ws.send("Message received"); // Echo back a confirmation
  });

  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });
});

// Start the server
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Sync the models with the database
sequelize
  .sync()
  .then(() => console.log("Database synced successfully"))
  .catch((err) => console.error("Error syncing database:", err));
=======
require('dotenv').config();
console.log("JWT Secret:", process.env.JWT_SECRET); 
const sequelize = require('./config/db');
const app = require('./app');

const PORT = process.env.PORT || 5000;

sequelize.sync() 
  .then(() => {
    console.log('Database synced successfully');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });
>>>>>>> 8c7ca18a8763856340358623c55a60caa04d1bc4
