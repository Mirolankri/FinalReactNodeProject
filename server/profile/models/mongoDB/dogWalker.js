const mongoose = require('mongoose')
const rate = require('./rate')

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
        type: String,
        required: true
    },
    experience: {
        type: String,
        require: true
    },
    bigDogs: {
        type: String,
        require: true
    },
    about: {
        type: String,
        minLength: 2,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    rate: [rate]
})

module.exports = dogWalkerSchema