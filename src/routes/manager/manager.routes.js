const {loginManager } = require('../../modules/superadmin/ManagerCreate/ManagerCreate.controller'); // Import the createManager 

const express = require('express');
const router = express.Router();

router.post('/login', loginManager);

module.exports = router;