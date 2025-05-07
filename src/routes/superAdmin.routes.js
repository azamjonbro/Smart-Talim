const express = require('express');
const router = express.Router();
const {
    createSuperAdmin,
    loginSuperAdmin,
    updateSuperAdmin,
} = require('../modules/superadmin/Login/superadmin.controller');  
const authenticate = require('../middlewares/authMiddleware'); 
const {createSuperAdminSettings,updateSuperAdminSettings,getSuperAdminSettings} = require('../modules/superadmin/settings/superadmin.settings.controller'); // Import the createSuperAdminSettings function


router.post('/create', authenticate, createSuperAdmin);


router.post('/login', loginSuperAdmin);
router.put('/update/:id', authenticate, updateSuperAdmin);


router.post('/settings', authenticate, createSuperAdminSettings);
router.put('/settings/:id', authenticate, updateSuperAdminSettings); 
router.get('/settings', authenticate, getSuperAdminSettings);

module.exports = router;
