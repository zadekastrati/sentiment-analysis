const sequelize = require("./config/db"); // Import Sequelize instance

const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// Sync the models with the database
sequelize
  .sync() // Default: force = false
  .then(() => {
    console.log("Database synced successfully");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });
