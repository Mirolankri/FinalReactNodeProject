const mongoose = require('mongoose')

const DaysSchema = mongoose.Schema({
    DayNumber:{
        type:Number,
        trim:true,
        minLength: 1,
        maxLength: 1,
        required: true,
        default:1
    },
    StartTime:{
        type:Number,
        trim:true,
        min: 0,    // Minimum value
        max: 23,    // Maximum value
        minLength: 1,
        maxLength: 2,
        required: true,
        default:8
    },
    EndTime:{
        type:Number,
        trim:true,
        min: 0,    // Minimum value
        max: 23,    // Maximum value
        minLength: 1,
        maxLength: 2,
        required: true,
        default:17

    },
    active:{
        type:Boolean,
        required: true,
        default:true
    }
})
module.exports = DaysSchema