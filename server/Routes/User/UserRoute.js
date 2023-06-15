const express = require ("express")
const router = express.Router()
const jwt = require('jsonwebtoken');

const UserSchema = require("../../db/schemas/User");
const { GeneratePassWord,ComparePassWord } = require("../../helpers/bcrypt");
const {generateCode,generateID} = require("../../helpers/generateNumbers")
require('dotenv').config()

const secretKey = process.env.JWT_KEY;


router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	let CheckUserLogin = await UserSchema.findOne({email:email})
	if(!CheckUserLogin) throw Error('אחד הפרטים לא נכונים')

	// let result = users.filter(
	// 	(user) => user.email === email && user.password === password
	// );
	let CheckPassWord = ComparePassWord(password,CheckUserLogin.password);

	if (!CheckPassWord) {
		return res.json({
			error_message: "אחד הפרטים לא נכונים",
		});
	}
	code = generateCode(100000,999999);

	//👇🏻 Send the SMS 
    console.log(CheckUserLogin, code);
	req.session.UserID = CheckUserLogin._id;
	req.session.username = CheckUserLogin.username;

	// console.log(req.session);
	const token = jwt.sign({ username: CheckUserLogin.username }, secretKey,{ expiresIn: "24h" });
    // req.headers.authorization = `Bearer ${token}`
    // console.log(req.headers);
	res.json({
		message: "Login successfully",
		data: {
			userdata: CheckUserLogin,
			code: code,
			token:token,
			sess:req.session
		},
	});
});

router.post("/register", async (req, res) => {

	try {
		const { email, password, tel, username } = req.body;

		let CheckUserRegister = await UserSchema.findOne({email})
		console.log(CheckUserRegister);
		// return
		if(CheckUserRegister) throw Error('משתמש קיים במערכת')

		req.body.password = GeneratePassWord(req.body.password)

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
			error_message: JSON.stringify(error),
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
   
    
    const UserID = req.session.UserID;
    console.log("ff");
    console.log(req.headers);
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    // Verify the token
    console.log(UserID);
    
    const decoded = jwt.verify(token, secretKey);

    // const token = req.headers.authorization.split(' ')[1];


    let CheckUserLogin = await UserSchema.findOne({username:decoded.username})
	if(!CheckUserLogin) throw Error('משתמש לא מחובר')

    // delete req.cookies;
    res.json({
		CheckUserLogin: CheckUserLogin,
		session: req.session,
		headers: req.headers,
        cookie:req.cookies,
        // token:token
		// header: req.header,
	});

})

router.post("/verification", (req, res) => {
    console.log(req.body.code);
    console.log(code);
	if (code == req.body.code) {
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


module.exports = router