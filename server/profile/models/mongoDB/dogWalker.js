const mongoose = require('mongoose')

const dogWalkerSchema = mongoose.Schema({
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

module.exports = dogWalkerSchema