const express = require('express');
const router = express.Router();
const {
    createSuperAdmin,
    loginSuperAdmin,
    updateSuperAdmin,
} = require('../modules/superadmin/Login/superadmin.controller');  
const authenticate = require('../middlewares/authMiddleware'); // JWT tekshiruv


router.post('/create', authenticate, createSuperAdmin);


router.post('/login', loginSuperAdmin);
router.put('/update/:id', authenticate, updateSuperAdmin);

module.exports = router;
