const express = require('express');
const cors = require('cors'); 
const authRoutes = require('./routes/authRoutes');
const app = express();

// Allow requests from multiple origins (localhost:3000 and localhost:3001)
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., Postman, curl) or from allowed origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],  // Specify allowed methods
  credentials: true,  // Include cookies if needed
}));

// Middleware
app.use(express.json());  // To parse incoming JSON requests

// Routes
app.use('/api/auth', authRoutes);  // All routes under /api/auth will use authRoutes

module.exports = app;
