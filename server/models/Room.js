const { Schema, model } = require('mongoose');

const schema = new Schema(
    {
        name: String,
        capacity: Number,
        price: Number,
        mainPhoto: String,
        briefDescription: Array,
        photos: Array,
        amenitiesInside: Array,
        amenitiesOutside: Array
    },
    {
        timestamps: true
    }
);

module.exports = model('Room', schema);
