const express = require('express');
const router = express.Router({ mergeParams: true });
const Room = require('../models/Room');
const getServerError = require('../utils/getServerError');

router.get('/', async (req, res) => {
    try {
        const list = await Room.find();
        res.send(list);
    } catch (e) {
        getServerError(res);
    }
});

module.exports = router;
