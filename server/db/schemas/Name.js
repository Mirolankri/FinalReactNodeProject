const mongoose = require("mongoose");
const { SRM2,NRM1 } = require("./Template");

const NameSchema = mongoose.Schema({
    first:SRM2,
    middle:{
        type: String,
        maxLength: 256,
        trim: true,
        lowercase: true,
      },
    last:SRM2
})

module.exports = NameSchema