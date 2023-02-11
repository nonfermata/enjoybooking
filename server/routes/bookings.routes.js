const express = require('express');
const router = express.Router({ mergeParams: true });
const Booking = require('../models/Booking');
const getServerError = require('../utils/getServerError');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/createBooking', authMiddleware, async (req, res) => {
    try {
        const newBooking = await Booking.create({
            ...req.body,
            userId: req.user._id
        });
        res.status(201).send(newBooking);
    } catch (e) {
        getServerError(res);
    }
});

router.patch('/edit/:bookingId', authMiddleware, async (req, res) => {
    try {
        const { bookingId } = req.params;
        const booking = await Booking.findById(bookingId);
        if (
            req.user._id === booking.userId.toString() ||
            req.user._id === process.env.SERVER_APP_ADMIN
        ) {
            const updatedBooking = await Booking.findByIdAndUpdate(
                bookingId,
                req.body,
                {
                    new: true
                }
            );
            res.send(updatedBooking);
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (e) {
        getServerError(res);
    }
});

router.get('/', authMiddleware, async (req, res) => {
    try {
        let bookings;
        if (req.user._id === process.env.SERVER_APP_ADMIN) {
            bookings = await Booking.find();
        } else {
            bookings = await Booking.find({ userId: req.user._id });
        }
        res.send(bookings);
    } catch (e) {
        getServerError(res);
    }
});

module.exports = router;
