const mongoose = require('mongoose')
const rate = require('./rate')

const DogOwnerSchema = mongoose.Schema({
    payBy: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
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