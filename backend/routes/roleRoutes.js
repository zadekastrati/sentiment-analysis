const express = require("express");
const RolesController = require("../controllers/roleController");

const router = express.Router();

router.get('/', RolesController.getAllRoles);
router.get('/:id', RolesController.getRoleById);
router.post('/', RolesController.createRole);
router.put('/:id', RolesController.updateRole);
router.delete('/:id', RolesController.deleteRole);

module.exports = router;
