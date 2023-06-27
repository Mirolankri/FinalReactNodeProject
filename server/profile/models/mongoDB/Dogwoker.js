const mongoose = require('mongoose')

const DogwokerSchema = mongoose.Schema({
    dogsInTrip: {
        type: Number,
        required: true
    },
    payBy: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    }
})

module.exports = DogwokerSchema