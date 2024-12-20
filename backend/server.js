require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');// Adjust the path as necessary
const commentRoutes = require('./routes/commentRoutes'); // Adjust the path if necessary
const authRoutes = require('./routes/authRoutes'); // Import auth routes

const EventEmitter = require('events');
EventEmitter.defaultMaxListeners = 20;

const app = express();


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/comments', commentRoutes);
app.use('/api/auth', authRoutes); // For authentication

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
