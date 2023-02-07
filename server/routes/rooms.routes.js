const express = require('express');
const router = express.Router({ mergeParams: true });
const Room = require('../models/Room')

router.get('/', async (req, res) => {
    try {
        const list = await Room.find();
        res.status(200).send(list);
    } catch (e) {
        res.status(500).json({
            message: 'Server error! Try again later'
        });
    }
});

module.exports = router;
