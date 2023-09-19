const mongoose = require('mongoose')

const ReviewSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    name: {
        type: String,
        minLength: 2,
        maxLength: 256,
        require: true,
        trim: true
    },
    gender: {
        type: String,
        minLength: 2,
        maxLength: 256,
        require: true,
        trim: true

    },
    allergy: {
        type: String,
        minLength: 2,
        maxLength: 3,
        require: true,
        trim: true

    },
    birth: {
        type: Date,
    },
    meetdogs: {
        type: String,
        minLength: 2,
        maxLength: 3,
        require: true,
        trim: true

    },
    meetpepole: {
        type: String,
        minLength: 2,
        maxLength: 3,
        require: true,
        trim: true

    },
    about: {
        type: String,
        minLength: 2,
        maxLength: 300,
        require: false,
        trim: true

    },
    active:{
        type:Boolean,
        default:true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('dog', ReviewSchema)