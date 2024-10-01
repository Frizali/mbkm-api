const express = require('express');
const router = express.Router();
const menuController = require('../controllers/static.controller');

// Menu
router.get('/menu/:accessId', menuController.getMenu);
// Breadcrumb
router.get('/breadcrumb', menuController.getBreadcrumbPath);
// Column Setup
router.get('/column/:type/:accessId', menuController.getColumnSetup);
router.post('/column', menuController.updateColumnWidth);

module.exports = router;