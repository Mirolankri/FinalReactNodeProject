import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const Signup = () => {
	const [email, setEmail] = useState("miro@istoreil.co.il");
	const [username, setUsername] = useState("miros");
	const [tel, setTel] = useState("0542412241");
	const [password, setPassword] = useState("1234");
    const [isLoading, setLoading] = useState(false);

	const navigate = useNavigate();

	const postSignUpDetails = () => {
		fetch(`${process.env.REACT_APP_DOMAIN}/user/register`, {
			method: "POST",
			body: JSON.stringify({
				email,
				password,
				tel,
				username,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error_message) {
					alert(data.error_message);
                    setLoading(false);
				} else {
					alert("Account created successfully!");
					navigate("/login");
				}
			})
			.catch((err) => console.error(err));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
        setLoading(true);
        // return
		postSignUpDetails();
		setEmail("");
		setTel("");
		setUsername("");
		setPassword("");
	};
	const gotoLoginPage = () => navigate("/");

	return (
        <>
        <div className="Auth-form-container">
			<form className="Auth-form">
				<div className="Auth-form-content">
				<h3 className="Auth-form-title">Get started With XX</h3>
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
					<label htmlFor='usename'>User Name</label>
                    <input
						className="form-control mt-1"
						placeholder="Enter User Name"
						type='text'
						id='username'
						name='username'
						value={username}
						required
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
                <div className="form-group mt-3">
					<label htmlFor='tel'>Phone Number</label>
                    <input
						className="form-control mt-1"
						placeholder="Enter Phone Number"
						type='text'
						id='tel'
						name='tel'
						value={tel}
						required
						onChange={(e) => setTel(e.target.value)}
					/>
				</div>
                <div className="form-group mt-3">
					<label htmlFor='password'>Password</label>
                    <input
						className="form-control mt-1"
						placeholder="Enter Password"
						type='password'
						id='password'
						name='password'
						value={password}
						required
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<div className="d-grid gap-2 mt-3">
					<Button 
					variant="primary" 
					className="btn-block w-100" 
					type="submit" 
					disabled={!email || !password || !username || !tel || isLoading}
					onClick={!isLoading ? handleSubmit : null}>

					{isLoading ? (
							<>
							Loading... <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
							</>
						) : (
							'Sign Up'
						)}
						
					</Button>
				</div>
				
				<p className="dont-have-account text-right mt-2">
				Already have an account?{" "}
					<span className='link' onClick={gotoLoginPage}>
						Login
					</span>
				</p>
				</div>
			</form>
		</div>
        

		<div className='signup__container d-none'>
			<h2>Sign up </h2>
			<form className='signup__form' onSubmit={handleSubmit}>
				<label htmlFor='email'>Email Address</label>
				<input
					type='email'
					name='email'
					id='email'
					value={email}
					required
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label htmlFor='username'>Username</label>
				<input
					type='text'
					id='username'
					name='username'
					value={username}
					required
					onChange={(e) => setUsername(e.target.value)}
				/>
				<label htmlFor='tel'>Phone Number</label>
				<input
					type='tel'
					name='tel'
					id='tel'
					value={tel}
					required
					onChange={(e) => setTel(e.target.value)}
				/>
				<label htmlFor='tel'>Password</label>
				<input
					type='password'
					name='password'
					id='password'
					minLength={8}
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button className='signupBtn'>SIGN UP</button>
				<p>
					Already have an account?{" "}
					<span className='link' onClick={gotoLoginPage}>
						Login
					</span>
				</p>
			</form>
		</div>
        </>
	);
};

export default Signup;