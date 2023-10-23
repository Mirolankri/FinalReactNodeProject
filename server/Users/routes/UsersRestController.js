const express = require ("express")
const router = express.Router()
const jwt = require('jsonwebtoken');

const UserSchema = require("../../db/schemas/User");
const { GeneratePassWord, ComparePassWord } = require("../../helpers/bcrypt");
const {generateCode,generateID} = require("../../helpers/generateNumbers");
const { verifyGoogleToken } = require("../../helpers/googleverify");
const DogsSchema = require("../../dogs/models/mongoDB/Dog");
const { handleError } = require("../../utils/errorHandler");
const { getMe, GetUsers, GetUserAvailableForAppointment, Login, register } = require("../models/AccessDataService");
const { getMyDogs } = require("../../dogs/models/AccessDataService");
require('dotenv').config()

const secretKey = process.env.JWT_KEY;


router.post("/login", async (req, res) => {
	const _BodyData = req.body;
	console.log(_BodyData);

	try {
		const LoginUser = await Login(_BodyData)
		let code = 111111
        // Send SMS HERE
        // code = generateCode(100000,999999);
		req.session.Site = {
			UserID:LoginUser._id,
			username:LoginUser.username,
			JWT_TOKEN:LoginUser.token,
			OTP:code
		}
		console.log(req.session.Site);
		return res.send(LoginUser)
	} catch (error) {
		return handleError(res, error.status || 500, error.message)

	}


	res.json({
		message: "Login successfully",
		data: {
			userdata: CheckUserLogin,
			code: code,
			token:token,
			sess:req.session,
			dogs:GetDogs
		},
	});
});

router.post("/register", async (req, res) => {
	const _BodyData = req.body;
	try {
		
		const registerUser = await register(_BodyData)
		req.session.Site = {
			UserID:registerUser._id,
			username:registerUser.username
		}
		return res.send(registerUser)
	} catch (error) {
		return handleError(res, error.status || 500, error.message)

	}


	try {
		const { email, password, tel, username,UserType } = req.body;

		let CheckUserRegister = await UserSchema.findOne({email})
		// return
		switch (UserType) {
			case '1':
				req.body.isDogManager = true
				break;
			case '2':
				req.body.isDogWalker = true
				break;
		
		}
		// if(CheckUserRegister) throw Error('משתמש קיים במערכת')
		if(CheckUserRegister) throw new Error('משתמש קיים במערכת')

		req.body.password = GeneratePassWord(req.body.password)

		console.log(req.body);
		let User = await UserSchema(req.body).save()
		// Set the user ID in the session
		req.session.UserID = User._id;
		req.session.username = User.username;

		console.log("User",User);
		// User = lodash.pick(User,["_id","Name","email"])
		// return Promise.resolve(User)
		return res.status(201).json({
			message: "Account created successfully!",
		});
	} catch (error) {
		error.status = 404
		// return Promise.reject(error)
		return res.json({
			error_message: "משתמש קיים במערכת",
			// error_message: "User already exists",
		});
	}
});

router.get('/protected', (req, res) => {
	// console.log(req);
	// return
	// Extract the token from the request header
	
	try {
	const token = req.headers.authorization.split(' ')[1];
	  // Verify the token
	  const decoded = jwt.verify(token, secretKey);
  
	  // Token is valid, send a response
	  res.json({ message: 'Protected resource', username: decoded.username ,sess:req.session,sid:req.sessionID});
	} catch (error) {
	  // Token is invalid or expired
	  res.status(401).json({ error: 'Invalid token' });
	}
});

router.get('/getme',async (req,res)=>{
    const UserID = req.session.Site?.UserID;
    const token = req.headers.authorization.split(' ')[1];
    try {
        let UserAuth = await getMe(UserID,token);

        let response = {
            CheckUserLogin: UserAuth,
			session: req.session,
			headers: req.headers,
			cookie:req.cookies,
        }
        return res.send(response)
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
	if(UserID)
	{
		
		// const decoded = jwt.verify(token, secretKey);

		// let CheckUserLogin = await UserSchema.findOne({username:decoded.username})
		// if(!CheckUserLogin) throw Error('משתמש לא מחובר')

		// delete req.cookies;
		res.json({
			CheckUserLogin: CheckUserLogin,
			session: req.session,
			headers: req.headers,
			cookie:req.cookies,
			// token:token
			// header: req.header,
		});

	}
	else
	{
		res.json({
			error_message: "Incorrect get me",
		});
	}

})

router.post("/verification", (req, res) => {
	const OTPToVerify = req.session.Site.OTP
	const OTPFromUser = req.body.code
	let response
	try {
		if(OTPToVerify != OTPFromUser) throw Error(`קוד אימות לא תקין`)

		response = {
			token:req.session.Site.JWT_TOKEN,
			username:req.session.Site.username
		}
		return res.send(response)
	} catch (error) {
		return handleError(res, error.status || 403, error.message)

	}
	console.log(req.session.Site.OTP);
    // console.log(req.body.code);
    // console.log(code);
	if (req.session.Site.OTP == req.body.code) {
		return res.json({ message: "You're verified successfully" });
	}
	res.json({
		error_message: "Incorrect credentials",
	});
});

router.post('/logout', (req, res) => {
	// Clear the user ID from the session
    console.log(req.session);

	// req.session.userId = null;
    req.session.destroy();
    // req.session.resetMaxAge()
    console.log(req.session);

  
	res.json({ message: 'Logout successful' });
});

router.get('/get-user-by-type/:type',async (req,res)=>{
	const Type = req.params.type
    const UserID = req.session.Site?.UserID;
    const token = req.headers.authorization?.split(' ')[1];
	let Filter = {
		[Type]:true
	}
	let Option = {
		GetProfile:true
	}
    try {
        let UserAuth = await GetUsers(Filter,Option);

        // let response = {
        //     CheckUserLogin: UserAuth,
		// 	session: req.session,
		// 	headers: req.headers,
		// 	cookie:req.cookies,
        // }
        return res.send(UserAuth)
    } catch (error) {
        return handleError(res, error.status, error.message)
    }

})
router.get('/available-for-appointments/:daynumber',async (req,res)=>{
	const daynumber = req.params.daynumber
    const UserID = req.session.Site?.UserID;
    const token = req.headers.authorization?.split(' ')[1];
	let Filter = {
		DayNumber:daynumber
	}
	let Option = {
		GetProfile:true
	}
    try {
        let UserAuth = await GetUserAvailableForAppointment(Filter,Option);

        // let response = {
        //     CheckUserLogin: UserAuth,
		// 	session: req.session,
		// 	headers: req.headers,
		// 	cookie:req.cookies,
        // }
        return res.send(UserAuth)
    } catch (error) {
        return handleError(res, error.status, error.message)
    }

})

module.exports = router