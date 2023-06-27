const mongoose = require('mongoose')

const AddressSchema = mongoose.Schema({
    city: {
        type: String,
        trim: true,
        minLength: 2,
        required: true
    },
    street: {
        type: String,
        trim: true,
        minLength: 2,
        required: true
    },
    houseNumber: {
        type: Number,
        required: true
    }
})

module.exports = AddressSchema