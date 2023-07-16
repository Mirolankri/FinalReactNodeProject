const mongoose = require('mongoose')

const dogWalkerSchema = mongoose.Schema({
    dogCount: {
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