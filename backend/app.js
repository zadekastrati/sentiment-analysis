const express = require("express");
const cors = require("cors");
const roleRoutes = require("./routes/roleRoutes");
const postsRoutes = require("./routes/postsRoutes");
const notificationRoutes = require("./routes/notification-route-file");
const contactUsRoutes = require("./routes/contact-us-route-file");
const interactionRoutes = require('./routes/interactionRoutes'); 

const app = express();

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

// Middleware to parse JSON
app.use(express.json());

app.use("/uploads", express.static("uploads"));

// Routes
app.use('/api/roles', roleRoutes);
app.use('/api/posts', postsRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/contact-us", contactUsRoutes);
app.use('/api/interactions', interactionRoutes);

module.exports = app;
