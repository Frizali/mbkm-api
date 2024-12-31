const router = require('express').Router();

router.use(require('./static.route'));
router.use(require('./submission.route'));
router.use(require('./auth.route'));
router.use(require('./dashboard.route'));
router.use(require('./logbook.route'));

module.exports = router;

