const { Schema, model } = require('mongoose');

const schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        capacity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        mainPhoto: {
            type: String,
            required: true
        },
        briefDescription: {
            type: Array,
            required: true
        },
        photos: {
            type: Array,
            required: true
        },
        amenitiesInside: {
            type: Array,
            required: true
        },
        amenitiesOutside: {
            type: Array,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = model('Room', schema);
