const express = require("express");
const session = require('express-session');
const router = require("./Routes/router")
const cors = require("cors");
const chalk = require('chalk');
const connectToDB = require('./db/dbService');
const cookieParser = require("cookie-parser")
// const proxy = require('express-http-proxy');

const { v4: uuidv4 } = require('uuid');
require('dotenv').config()
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(cors());
const corsOptions = {
    origin: ["http://localhost:3000"],
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
const generateCustomSessionId = () => {
	// Generate a UUID as the session ID
	const customSessionId = uuidv4();
	console.log(customSessionId);
	return customSessionId;
  };
// const oneDay = 1000 * 60 * 60 * 24;
const oneDay = 300000;
app.use(session({
	secret: process.env.SESSION_KEY,
	resave: false,
	saveUninitialized: true,
	name: 'MyApp',
	// resave: true,
	// genid: generateCustomSessionId,
	cookie: {
	  secure: false, // Set to true for HTTPS
	  maxAge: oneDay
	}
	
}));
// app.use((req,res,next)=>{
// 	console.log("app use session",req.session);
// 	next()
// })
// let code;

app.use(router)
// app.use(proxy('http://127.0.0.1:3000'));

app.listen(PORT, () => {
	console.log(chalk.bgRed(`Server listening on ${PORT}`));

	connectToDB(process.env.NODE_ENV)
});