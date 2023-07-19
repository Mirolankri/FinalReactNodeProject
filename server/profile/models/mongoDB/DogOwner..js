const mongoose = require('mongoose')
const rate = require('./rate')

const DogOwnerSchema = mongoose.Schema({
    dogCount: {
        type: Number,
        required: true
    },
    payBy: {
        type: String,
        required: true
    },
    mobile: {
        type: Boolean,
        required: true
    },
    experience: {
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
    dogs: [String],
    rate: [rate]
})

module.exports = DogOwnerSchema