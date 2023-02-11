const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router({ mergeParams: true });
const getServerError = require('../utils/getServerError');

router.patch('/:userId', authMiddleware, async (req, res) => {
    try {
        const { userId } = req.params;
        if (userId === req.user._id) {
            const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
                new: true
            });
            res.send(updatedUser);
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (e) {
        getServerError(res);
    }
});

router.get('/', authMiddleware, async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (e) {
        getServerError(res);
    }
});

module.exports = router;
