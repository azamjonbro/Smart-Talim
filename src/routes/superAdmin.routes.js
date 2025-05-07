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


// bu yerda superadmin manager yaratish uchun kerakli kodlar
const { createManager, getAllManagers, getManagerById } = require('../modules/superadmin/ManagerCreate/ManagerCreate.controller'); // Import the createManager 
router.post('/managers', authenticate, createManager);
router.get('/managers/:id', authenticate, getManagerById);

router.get('/managers', authenticate, getAllManagers);


module.exports = router;
