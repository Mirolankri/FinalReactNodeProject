const mongoose = require('mongoose')
const DaysSchema = require('./Days')

const defaultWeek = Array(7).fill().map((_, index) => ({
  DayNumber: index + 1, // 1 for Monday, 2 for Tuesday, and so on
  StartTime: 8, // Default start time
  EndTime: 17, // Default end time
  active: true, // Default active status
}));
const AppointmentsSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        unique: [true,"user_id Exist"]
    },
    Days:{
        type: [DaysSchema],
        require: true,
        default: [...defaultWeek]
    }
})



module.exports = mongoose.model("appointment", AppointmentsSchema)