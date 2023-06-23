import React, { useState,useEffect, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import LocalStorage from '../../Helpers/LocalStorage/LocalStorage'

// import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import Swal from 'sweetalert2'
import { UserContext, useUser } from "../../users/providers/UserProvider";




const Login = () => {
	// const { setUserData } = useContext(UserContext)
	const {setUserData,login} = useUser()
	// const [email, setEmail] = useState("");
	// const [password, setPassword] = useState("");
	const [email, setEmail] = useState("miro@istoreil.co.il");
	const [password, setPassword] = useState("1234");
	const [isLoading, setLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		function simulateNetworkRequest() {
		  return new Promise((resolve) => setTimeout(resolve, 5000));
		}
	
		if (isLoading) {
		  simulateNetworkRequest().then(() => {
			setLoading(false);
		  });
		}
	  }, [isLoading]);
	
	const postLoginDetails = () => {
		fetch(`${process.env.REACT_APP_DOMAIN}/user/login`, {
			method: "POST",
			body: JSON.stringify({
				email,
				password,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error_message) {
					alert(data.error_message);
				} else {
					console.log(data.data);
					
					// localStorage.setItem("username", data.data.username.username);
					login(data.data.userdata,data.data.token);
					navigate("/phone/verify");
				}
			})
			.catch((err) => console.error(err));
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
		<>
		<div className="Auth-form-container" style={{backgroundColor:'#8668FF'}}>
			<form className="Auth-form" style={{backgroundColor:'#FFF8F880'}}>
				<div className="Auth-form-content">
				<h3 className="Auth-form-title">
					<img src="/assets/images/logo/logo-orange.png" alt="Main Logo" width='100%'></img>
				</h3>
				<div className="form-group mt-3">
					<label htmlFor='email'>Email address</label>
					<input
						className="form-control mt-1"
						placeholder="Enter email"
						type='text'
						id='email'
						name='email'
						value={email}
						required
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="form-group mt-3">
					<label htmlFor='password'>Password</label>
					<input
						className="form-control mt-1"
						placeholder="Enter password"
						type='password'
						name='password'
						id='password'
						minLength={3}
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
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
							<i className="bi bi-apple"></i>
						</Button>
						<Button variant="outline-dark" size="xs" className="" type="button">
						<i className="bi bi-google"></i>						
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
				</div>
			</form>
		</div>
	
	<div className='login__container d-none'>
				<h2>Login </h2>
				<form className='login__form' onSubmit={handleSubmit}>
					<label htmlFor='email'>Email</label>
					<input
						type='text'
						id='email'
						name='email'
						value={email}
						required
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						name='password'
						id='password'
						minLength={3}
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button className='loginBtn'>SIGN IN</button>
					<p>
						Don't have an account?{" "}
						<span className='link' onClick={gotoSignUpPage}>
							Sign up
						</span>
					</p>
				</form>
			</div>
		</>
	);
};

export default Login;