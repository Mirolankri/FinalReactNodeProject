const mongoose = require("mongoose");
const { SRM2,NRM1,PassVALID } = require("./Template");



const AddressSchema = mongoose.Schema({
    state: SRM2,
    country: SRM2,
    city: SRM2,
    street: SRM2,
    housenumber:NRM1,
    zip:Number
})

module.exports = AddressSchema