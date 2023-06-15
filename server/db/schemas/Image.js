const mongoose = require("mongoose");
const { SRM2,NRM1,URLValid } = require("./Template");


const ImageSchema = mongoose.Schema({
    url:URLValid,
    alt:SRM2
})

module.exports = ImageSchema