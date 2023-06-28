const mongoose = require("mongoose")
const chalk = require("chalk")

mongoose
    .connect("mongodb://localhost:27017/pawllo")
    // .connect("mongodb://root:example@localhost:27017/business-card-app")
    .then(()=>console.log("connected to Mongo local"))
    .catch((err)=>console.log(`Err Mongo ${err}`))