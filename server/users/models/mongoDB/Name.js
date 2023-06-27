const mongoose = require('mongoose')

const NameSchema = mongoose.Schema({
    first: {
        type: String,
        minLength: 2,
        maxLength: 256,
        required: true,
        trim: true,
        lowercase: true
    },
    last: {
        type: String,
        minLength: 2,
        maxLength: 256,
        required: true,
        trim: true,
        lowercase: true
    }
})

module.exports = NameSchema