const express = require('express');
const { getRoles } = require('../controllers/roleController');

const router = express.Router();

// Route to fetch all roles
router.get('/roles', getRoles);

module.exports = router;
