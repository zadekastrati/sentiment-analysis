const express = require('express');
const roleRoutes = require('./routes/roleRoutes');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', roleRoutes);

module.exports = app;
