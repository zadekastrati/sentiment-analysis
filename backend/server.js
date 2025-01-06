require('dotenv').config();
console.log("JWT Secret:", process.env.JWT_SECRET); 
const sequelize = require('./config/db');
const app = require('./app');

const PORT = process.env.PORT || 5000;

sequelize.sync() 
  .then(() => {
    console.log('Database synced successfully');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });
