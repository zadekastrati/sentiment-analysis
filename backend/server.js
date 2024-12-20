const sequelize = require("./config/db"); // Import Sequelize instance
const Role = require("./models/roleModel"); // Import the Role model
const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Sync the models with the database
sequelize.sync()  // Drops and recreates the tables
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });
