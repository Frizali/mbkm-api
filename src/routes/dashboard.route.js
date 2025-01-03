const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');
const authenticateToken = require('../middlewares/authenticateToken.middleware');

router.get('/dashboard/submission-status', authenticateToken.authenticateToken, dashboardController.getSubmissionStatus);
router.get('/dashboard/submission-total', authenticateToken.authenticateToken, dashboardController.getSubmissionTotal);
router.get('/dashboard/submission-mentorship-total', authenticateToken.authenticateToken, dashboardController.getTotalSubmissionMentorship);
router.get('/dashboard/submission-program-type-total', authenticateToken.authenticateToken, dashboardController.getTotalSubmissionProgramTypeMentorship);

module.exports = router;