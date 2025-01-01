const Role = require('../models/roleModel'); 

const RolesController = {
  // Get all roles
  async getAllRoles(req, res) {
    try {
      const roles = await Role.findAll(); 
      res.status(200).json(roles); 
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get a single role by ID
  async getRoleById(req, res) {
    const { id } = req.params;
    try {
      const role = await Role.findByPk(id);
      if (!role) {
        return res.status(404).json({ message: 'Role not found' });
      }
      res.status(200).json(role);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create a new role
  async createRole(req, res) {
    const { title } = req.body;  // Assuming 'title' is a field in your Role model
    try {
      const newRole = await Role.create({ title });
      res.status(201).json(newRole);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update an existing role
  async updateRole(req, res) {
    const { id } = req.params;
    const { title } = req.body; // Assuming 'title' is the only field to update
    try {
      const role = await Role.findByPk(id);
      if (!role) {
        return res.status(404).json({ message: 'Role not found' });
      }
      role.title = title;  // Update the role's title
      await role.save();  // Save the updated role
      res.status(200).json(role);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a role
  async deleteRole(req, res) {
    const { id } = req.params;
    try {
      const role = await Role.findByPk(id);
      if (!role) {
        return res.status(404).json({ message: 'Role not found' });
      }
      await role.destroy();  // Delete the role
      res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = RolesController;
