const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submission.controller');
const authenticateToken = require('../middlewares/authenticateToken.middleware');

router.post('/submission', authenticateToken.authenticateToken, submissionController.submit);
router.get('/submission/:submissionId', authenticateToken.authenticateToken, submissionController.getSubmissionDetail);
router.get('/submission', authenticateToken.authenticateToken, submissionController.getSubmissions);
router.get('/pending-submission/:accessId', authenticateToken.authenticateToken, submissionController.getSubmissionByAccessID);

module.exports = router;