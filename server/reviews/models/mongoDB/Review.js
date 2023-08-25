const mongoose = require('mongoose')

const ReviewSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    profile_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    content: {
        type: String,
        minLength: 2,
        maxLength: 256,
        require: true,
        trim: true
    },
    rate: {
        type: Number,
        min: 1,
        max: 5,
        require: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('review', ReviewSchema)