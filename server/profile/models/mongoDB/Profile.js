const mongoose = require('mongoose')
const NameSchema = require('./Name')
const AddressSchema = require('./Address')
const dogWalkerSchema = require('./dogWalker')

const ProfileSchema = mongoose.Schema({
    name: NameSchema,
    birth: {
        type: Date,
        require: true
    },
    address: AddressSchema,
    phone: {
        type: String,
        match: RegExp(/^[0][5][0|2|3|4|5|8|9]{1}[-]{0,1}[0-9]{7}$/g)
    },
    dogWalker: dogWalkerSchema,
    experience: {
        type: String,
        require: true
    },
    bigDogs: {
        type: Boolean,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId
    }
})

module.exports = mongoose.model("profile", ProfileSchema)