const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');
const authenticateToken = require('../middlewares/authenticateToken.middleware');

router.get('/dashboard/submission-status', authenticateToken.authenticateToken, dashboardController.getSubmissionStatus);
router.get('/dashboard/submission-total', authenticateToken.authenticateToken, dashboardController.getSubmissionTotal);

module.exports = router;