const express = require('express');
const router = express.Router();
const staticController = require('../controllers/static.controller');

// Menu
router.get('/menu/:accessId', staticController.getMenu);
router.get('/menu/menu-access-detail/:accessId', staticController.getMenuAccessDetailByAccessID);
// Breadcrumb
router.get('/breadcrumb', staticController.getBreadcrumbPath);
// Column Setup
router.get('/column/:type/:accessId', staticController.getColumnSetup);
router.post('/column', staticController.updateColumnWidth);
// Access
router.get('/role-detail', staticController.getRoleDetail);

module.exports = router;