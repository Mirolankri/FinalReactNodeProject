const mongoose = require("mongoose");


const LoginUsersSchema = mongoose.Schema({
    user_id:mongoose.Types.ObjectId,
    count:[Date]
})


module.exports = mongoose.model("loginuser", LoginUsersSchema);