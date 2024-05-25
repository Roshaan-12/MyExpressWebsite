const mongoose = require('mongoose');

const chefSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    availability: {
        type: String,
        required: true
    },
    specialties: {
        type: [String],
        required: true
    }
});

const Chef = mongoose.model('Chef', chefSchema);

module.exports = Chef;
