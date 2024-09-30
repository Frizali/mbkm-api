const express = require('express');
const router = express.Router();
const menuController = require('../controllers/static.controller');

router.get('/menu/:accessId', menuController.getMenu);
router.get('/breadcrumb', menuController.getBreadcrumbPath);
router.get('/column/:type/:accessId', menuController.getColumnSetup);
router.post('/column', menuController.updateColumnWidth);

module.exports = router;