const mongoose = require('mongoose')

const rate = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    rate: {
        type: Number
    }
})

module.exports = rate