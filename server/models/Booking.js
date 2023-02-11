const { Schema, model } = require('mongoose');

const schema = new Schema(
    {
        checkIn: Number,
        checkOut: Number,
        persons: Number,
        totalNights: Number,
        status: String,
        roomId: { type: Schema.Types.ObjectId, ref: 'Room' },
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        userPhone: String
    },
    {
        timestamps: true
    }
);

module.exports = model('Booking', schema);
