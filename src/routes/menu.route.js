const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu.controller');

router.get('/menu/:accessId', menuController.getMenu);
router.get('/breadcrumb', menuController.getBreadcrumbPath);

module.exports = router;