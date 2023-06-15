const mongoose = require("mongoose")
require('dotenv').config()

// const chalk = require("chalk")
// const config = require('config')

const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;


mongoose
    // .connect("mongodb+srv://"+DB_NAME+":"+DB_PASSWORD+"@cluster0.vdfyzbz.mongodb.net/business-card-app")
    .connect(`mongodb+srv://${DB_NAME}:${DB_PASSWORD}@cluster1.ki8jj6l.mongodb.net/MyApp`) //?retryWrites=true&w=majority
    .then(()=>console.log("connected to Mongo Atlas"))
    .catch((err)=>console.log(`Err Mongo ${err}`))