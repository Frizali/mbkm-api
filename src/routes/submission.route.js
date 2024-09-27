const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submission.controller');

router.get('/submission/:submissionId', submissionController.getSubmissionDetail);
router.get('/submission', submissionController.getSubmissions);

module.exports = router;