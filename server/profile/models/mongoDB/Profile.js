const mongoose = require('mongoose')
const NameSchema = require('./Name')
const AddressSchema = require('./Address')
const dogWalkerSchema = require('./dogWalker')
const DogOwnerSchema = require('./DogOwner')

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
    gender: {
        type: String,
        require: true
    },
    profileImage: {
        type: String,
        match: RegExp(/^.*\.(jpg|JPG|jpeg|JPEG|png|PNG)$/g)
    },
    dogWalker: dogWalkerSchema,
    dogOwner: DogOwnerSchema,
    user_id: {
        type: mongoose.Schema.Types.ObjectId
    }
    
})

module.exports = mongoose.model("profile", ProfileSchema)