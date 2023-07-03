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



const Login = () => {
	axios.defaults.withCredentials = true;
	const {userData,setUserData,login} = useUser()
	const [email, setEmail] = useState("miro@istoreil.co.il");
	const [password, setPassword] = useState("1234");
	const [isLoading, setLoading] = useState(false);
	const [Error, setError] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		// if(userData) navigate("/")
		function simulateNetworkRequest() {
		  return new Promise((resolve) => setTimeout(resolve, 10000));
		}
	
		if (isLoading) {
		  simulateNetworkRequest().then(() => {
			setLoading(false);
		  });
		}
	  }, [isLoading]);
	
	const postLoginDetails = () => {
		const body = {email,password};
    	const headers = { 
        // 'Authorization': 'Bearer my-token',
        "Content-Type": "application/json",
    	};
	
    axios.post(`${process.env.REACT_APP_DOMAIN}/user/login`, body, { headers:headers })
        .then(response => {
			console.log(" response axios",response);
			if(response.data.error_message)
			{
				setLoading(false);
				
				return setError(response.data.error_message)
			}
			// localStorage.setItem("username", data.data.username.username);
			login(response.data.data.userdata,response.data.data.token);
			navigate("/phone/verify");

		});


		// fetch(`${process.env.REACT_APP_DOMAIN}/user/login`, {
		// 	method: "POST",
		// 	body: JSON.stringify({
		// 		email,
		// 		password,
		// 	}),
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// })
			// .then((res) => res.json())
			// .then((data) => {
			// 	if (data.error_message) {
			// 		alert(data.error_message);
			// 	} else {
			// 		console.log(data.data);
					
			// 		// localStorage.setItem("username", data.data.username.username);
			// 		login(data.data.userdata,data.data.token);
			// 		navigate("/phone/verify");
			// 	}
			// })
			// .catch((err) => console.error(err));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		
		setLoading(true);
		// return
		postLoginDetails();
		setPassword("");
		setEmail("");
	};

	const gotoSignUpPage = () => navigate("/register");

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
        		<label htmlFor="email">Email address</label>
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
        		<label htmlFor="password">Password</label>
      		</Form.Floating>
			
			<div className=" mt-3">
				<Button 
				variant="" 
				className="btn-block w-100" 
				type="submit" 
				style={{backgroundColor:"#FF8A00"}}
				disabled={!email || !password || isLoading}
				onClick={!isLoading ? handleSubmit : null}>

				{isLoading ? (
						<>
						Loading... <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
						</>
					) : (
						'Log in'
					)}
					
				</Button>

				<div style={{ display: "flex", alignItems: "center" }}>
					<div style={{ flex: 1, backgroundColor: "#ccc", height: "1px" }} />
					<p style={{ margin: "0 10px" }}>OR</p>
					<div style={{ flex: 1, backgroundColor: "#ccc", height: "1px" }} />
				</div>

				{/* <div style={{ display: "flex", alignItems: "center" }}> */}
				<ButtonGroup className="d-flex align-items-center mb-2" >
					
					<Button variant="outline-dark" size="xs" className="" type="button">
						Login With <i className="bi bi-google"></i>						
					</Button>
				</ButtonGroup>

				{/* </div> */}
			</div>
			<p className="forgot-password text-right mt-2">
				Forgot <a href="#">password?</a>
			</p>
			<p className="dont-have-account text-right mt-2">
			Don't have an account?{" "}
			<span className='link' onClick={gotoSignUpPage}>
				Sign up
			</span>
			</p>
		</BlankPage>
	);
};

export default Login;