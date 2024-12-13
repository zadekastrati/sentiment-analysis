const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const postsRoute = require('./routes/posts.route'); // Adjust the path as necessary

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', postsRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
