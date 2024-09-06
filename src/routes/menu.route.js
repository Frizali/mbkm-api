const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu.controller');

router.get('/menu', menuController.getMenu);

module.exports = router;