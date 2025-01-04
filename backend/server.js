// server.js
require('dotenv').config();
console.log("JWT Secret:", process.env.JWT_SECRET); 
const sequelize = require('./config/db');  // Import Sequelize instance
const app = require('./app');  // Import app.js

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {  // Bind to 0.0.0.0 to allow access from outside
  console.log(`Server running on http://localhost:${PORT}`);
});

// Sync the models with the database
sequelize.sync() // Default: force = false
  .then(() => {
    console.log('Database synced successfully');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });
