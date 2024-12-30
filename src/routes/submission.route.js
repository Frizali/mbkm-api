const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submission.controller');
const authenticateToken = require('../middlewares/authenticateToken.middleware');

router.post('/submission', authenticateToken.authenticateToken, submissionController.submit);
router.get('/submission/:submissionId', authenticateToken.authenticateToken, submissionController.getSubmissionDetail);
router.get('/submission', authenticateToken.authenticateToken, submissionController.getSubmissions);
router.get('/pending-submission', authenticateToken.authenticateToken, submissionController.getSubmissionByAccessID);
router.get('/submission-status', authenticateToken.authenticateToken, submissionController.getSubmissionStatus);
router.get('/submission-mentorship', authenticateToken.authenticateToken, submissionController.getSubmissionMentorship);
router.delete('/submission/:submissionId', authenticateToken.authenticateToken, submissionController.deleteSubmission);
router.post('/submission/approve/:submissionId', authenticateToken.authenticateToken, submissionController.approve);
router.post('/submission/reject/:submissionId', authenticateToken.authenticateToken, submissionController.reject);
router.put('/submission/re-assign', authenticateToken.authenticateToken, submissionController.reAssign);

module.exports = router;