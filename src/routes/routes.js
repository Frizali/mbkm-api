const router = require('express').Router();

//menu routes
router.use(require('./static.route'));
router.use(require('./submission.route'));

module.exports = router;

