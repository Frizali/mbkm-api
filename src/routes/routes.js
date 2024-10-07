const router = require('express').Router();

//menu routes
router.use(require('./static.route'));
router.use(require('./submission.route'));
router.use(require('./auth.route'));

module.exports = router;

