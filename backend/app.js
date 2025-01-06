const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const postsRoutes = require("./routes/postsRoutes");
const notificationRoutes = require("./routes/notification-route-file");
const contactUsRoutes = require("./routes/contact-us-route-file");
const interactionRoutes = require("./routes/interactionRoutes");
const app = express();

// Allow requests from multiple origins (localhost:3000 and localhost:3001)
const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (e.g., Postman, curl) or from allowed origins
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Specify allowed methods
    credentials: true, // Include cookies if needed
  })
);

// Middleware to parse JSON
app.use(express.json()); // To parse incoming JSON requests

app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes); // All routes under /api/auth will use authRoutes
app.use("/api/posts", postsRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/contact-us", contactUsRoutes);
app.use("/api/interactions", interactionRoutes);

module.exports = app;
