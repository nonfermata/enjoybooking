const express = require('express');
const router = express.Router({ mergeParams: true });

router.use('/auth', require('./auth.routes'));
router.use('/bookings', require('./bookings.routes'));
router.use('/users', require('./users.routes'));
router.use('/rooms', require('./rooms.routes'));

module.exports = router;
