import React, { useState,useEffect, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import LocalStorage from '../../Helpers/LocalStorage/LocalStorage'

// import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
// import Swal from 'sweetalert2'
import { UserContext, useUser } from "../providers/UserProvider";
import  axios  from "axios";
import BlankPage from "./BlankPage";
import Users from "../service/usersApiService";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Google from '../../components/Buttons/SignInButtons/google';



const Login = () => {
	// const instance = axios.create({
	// 	withCredentials: true
	//   })
	let ParamToLogin = "ben@krakov.co"
	if(process.env.REACT_APP_WHO && process.env.REACT_APP_WHO === "MIRO")
	{
		ParamToLogin = "0542412241"
	}
	const {userData,setUserData,login,SetLocalStorage} = useUser()

	const [email, setEmail] = useState(ParamToLogin);
	const [password, setPassword] = useState("1234");
	const [isLoading, setLoading] = useState(false);
	const [Error, setError] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		

		function simulateNetworkRequest() {
		  return new Promise((resolve) => setTimeout(resolve, 9999999));
		}
	
		if (isLoading) {
		  simulateNetworkRequest().then(() => {
			setLoading(false);
		  });
		}
	  }, [isLoading]);
	
	const postLoginDetails = () => {
		const UsersInstance = new Users();
		const body = {email,password};
		UsersInstance.Login(body)
		.then(response=>{
			console.log(response);
			login(response);
			navigate("/phone/verify");
		}).catch(error=>{
			// console.info(error);
			setLoading(false);
			return setError(error.response.data)
		})

	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		postLoginDetails();
		setPassword("");
		setEmail("");
	};

	const gotoSignUpPage = () => navigate("/register");
	// console.log(userData);
	// if(userData) return navigate("/")
	return (
		<BlankPage>
			{Error && (<div className="mt-3 text-center text-danger">{Error}</div>)}
			<Form.Floating className="mt-3">
				<Form.Control
				id="email"
				type="email"
				placeholder="Enter Email"
				name="email"
				value={email}
				required
				onChange={(e) => setEmail(e.target.value)}
				/>
        		<label htmlFor="email">טלפון נייד / דו״אל</label>
      		</Form.Floating>

			  <Form.Floating className="mt-3">
				<Form.Control
				id="password"
				type="password"
				placeholder="Enter Password"
				name="password"
				value={password}
				required
				onChange={(e) => setPassword(e.target.value)}
				minLength={3}
				/>
        		<label htmlFor="password">סיסמא</label>
      		</Form.Floating>
			
			<div className=" mt-3">
				<Button 
				variant="orange" 
				className="btn-block w-100" 
				type="submit" 
				// style={{backgroundColor:"#FF8A00"}}
				disabled={!email || !password || isLoading}
				onClick={!isLoading ? handleSubmit : null}>

				{isLoading ? (
						<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
					) : (
						'התחברות'
					)}
				</Button>

				<div style={{ display: "flex", alignItems: "center" }}>
					<div style={{ flex: 1, backgroundColor: "#ccc", height: "1px" }} />
					<p style={{ margin: "0 10px" }}>או</p>
					<div style={{ flex: 1, backgroundColor: "#ccc", height: "1px" }} />
				</div>

				{/* <div style={{ display: "flex", alignItems: "center" }}> */}
				<ButtonGroup className="d-flex align-items-center mb-2 justify-content-center" >
				<GoogleOAuthProvider  clientId="213352614385-gk8iuql2eok33cisjg8mt6l5iil2c2fa.apps.googleusercontent.com">
          			<Google CustomParam={{login,navigate,SetLocalStorage}}/>
        		</GoogleOAuthProvider>
					
				</ButtonGroup>

				{/* </div> */}
			</div>
			
			<span className='link forgot-password text-right mt-2'>
				שכחתי סיסמא?
			</span>
			<p className="dont-have-account text-right mt-2">
			אין לך חשבון?{" "}
			<span className='link' onClick={gotoSignUpPage}>
				הרשמה
			</span>
			</p>
		</BlankPage>
	);
};

export default Login;