const express = require('express');
const router = express.Router();
const logbookController = require('../controllers/logbook.controller');
const authenticateToken = require('../middlewares/authenticateToken.middleware');

router.post('/logbook', authenticateToken.authenticateToken, logbookController.createLogbook);
router.get('/logbook/:submissionId', authenticateToken.authenticateToken, logbookController.getLogbookBySubmissionID);

module.exports = router;