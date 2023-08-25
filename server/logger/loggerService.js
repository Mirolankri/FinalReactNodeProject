require('dotenv').config()
const express = require('express')
const app = express()
const LOGGER = process.env.LOGGER
const morgan = require('morgan')
const morganLogger = require('./loggers/morganLogger')

// const fs = require("fs")
// const path = require('path')
// let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})

if(LOGGER === 'morgan'){
    // app.use(morgan('combined',{skip: (req, res)=>{ return res.statusCode < 400}, stream: accessLogStream}));
    app.use(morganLogger);
}

module.exports = app