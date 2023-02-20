const { Schema, model } = require('mongoose');

const schema = new Schema(
    {
        name: String,
        listNumber: Number,
        capacity: Number,
        price: Number,
        kitchen: Boolean,
        bathroom: Boolean,
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
