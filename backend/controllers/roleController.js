const Role = require('../models/roleModel'); // Import the Role model

const getRoles = async (req, res) => {
  try {
    // Fetch all roles using Sequelize
    const roles = await Role.findAll();
    
    // Get plain data (not Sequelize instances)
    const rolesData = roles.map(role => role.get());

    // Check if there are roles
    if (rolesData.length === 0) {
      return res.status(404).json({ message: 'No roles found' });
    }

    res.status(200).json(rolesData);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getRoles };
