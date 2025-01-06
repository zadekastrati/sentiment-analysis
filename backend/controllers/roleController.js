const Role = require('../models/roleModel'); 

const RolesController = {
  async getAllRoles(req, res) {
    try {
      const roles = await Role.findAll(); 
      res.status(200).json(roles); 
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

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

  async createRole(req, res) {
    const { title } = req.body; 
    try {
      const newRole = await Role.create({ title });
      res.status(201).json(newRole);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateRole(req, res) {
    const { id } = req.params;
    const { title } = req.body;
    try {
      const role = await Role.findByPk(id);
      if (!role) {
        return res.status(404).json({ message: 'Role not found' });
      }
      role.title = title;  
      await role.save();
      res.status(200).json(role);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteRole(req, res) {
    const { id } = req.params;
    try {
      const role = await Role.findByPk(id);
      if (!role) {
        return res.status(404).json({ message: 'Role not found' });
      }
      await role.destroy(); 
      res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = RolesController;