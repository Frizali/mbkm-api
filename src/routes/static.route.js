const express = require('express');
const router = express.Router();
const staticController = require('../controllers/static.controller');
const authenticateToken = require('../middlewares/authenticateToken.middleware');

// Menu
router.get('/menu', authenticateToken.authenticateToken, staticController.getMenu);
router.get('/redirect-menu', authenticateToken.authenticateToken, staticController.getRedirectMenuByAccessID);
router.get('/menu/menu-access-detail/:accessId', staticController.getMenuAccessDetailByAccessID);
// Breadcrumb
router.get('/breadcrumb', staticController.getBreadcrumbPath);
// Column Setup
router.get('/column/:type', authenticateToken.authenticateToken, staticController.getColumnSetup);
router.post('/column', staticController.updateColumnWidth);
// Access
router.get('/role-detail', staticController.getRoleDetail);
router.get('/user/:accessId', staticController.getUserByAccessID);

module.exports = router;