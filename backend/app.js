const express = require("express");
const roleRoutes = require("./routes/roleRoutes");
const notificationRoutes = require("./routes/notification-route-file");
const contactUsRoutes = require("./routes/contact-us-route-file");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/roles", roleRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/contact-us", contactUsRoutes);

module.exports = app;
