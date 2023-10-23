import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import BlankPage from "./BlankPage";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import ToggleButton from "react-bootstrap/esm/ToggleButton";
import Form from 'react-bootstrap/Form';
import { OptionUserType } from "../const/userconst";
import ROUTES from "../../routes/routesModel";
import Users from "../service/usersApiService";

const Signup = () => {
	const [email, setEmail] = useState("miro@istoreil.co.il");
	const [username, setUsername] = useState("miros");
	const [tel, setTel] = useState("0542412241");
	const [password, setPassword] = useState("1234");
    const [isLoading, setLoading] = useState(false);
    const [Agreement, setAgreement] = useState(false);
	const [UserType, setUserType] = useState(false);
	const [Error, setError] = useState("");



	const navigate = useNavigate();
	const handleSubmit = (e) => {
		e.preventDefault();
        setLoading(true);
		postSignUpDetails();
		setEmail("");
		setTel("");
		setUsername("");
		setPassword("");
		setUserType(false);
	};
	const handleCheckboxAgreement = (e) => {
		setAgreement(e.target.checked)
	}
	const gotoLoginPage = () => navigate(`${ROUTES.LOGIN}`);

	const postSignUpDetails = () => {
		const UsersInstance = new Users()
		let BodyData = {email,password,tel,username,UserType}

		UsersInstance.SignUp(BodyData)
		.then(response=>{
			console.log(response);
			navigate(`${ROUTES.LOGIN}`);
		})
		.catch(error=>{
			console.error(error)
			setLoading(false);
			return setError(error.response.data)
		})
	};
	return (
        <BlankPage>
        {/* <div className="Auth-form-container">
			<form className="Auth-form">
				<div className="Auth-form-content"> */}

				<h3 className="Auth-form-title">מתחילים כאן</h3>
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
				<Form.Group className="form-group mt-3" controlId="exampleForm.ControlInput1">
					<Form.Label>מי את/ה</Form.Label>

					<ButtonGroup className="d-flex align-items-center mb-2" >
				{OptionUserType.map((radio, idx) => (
					<ToggleButton
						key={idx}
						id={`radio-${idx}`}
						type="radio"
						variant="outline-dark"
						name="radio"
						value={radio.value}
						checked={UserType === radio.value}
						onChange={(e) => setUserType(e.currentTarget.value)}
					>
						{radio.name}
					</ToggleButton>
					))}
				</ButtonGroup>
				</Form.Group>
				



				<div className="form-group form-check mt-3">
					<label htmlFor='agreement'>
					בלחיצה על הירשם אתה מסכים לתנאים ולהגבלות שלנו, ואתה מאשר שקראתה את מדיניות הפרטיות שלנו
					</label>
                    <input
						className="form-check-input mt-1"
						type='checkbox'
						id='agreement'
						name='agreement'
						checked={Agreement}
						required
						onChange={handleCheckboxAgreement}
					/>
				</div>
				<div className="d-grid gap-2 mt-3">
				{Error && (<div className="mt-3 text-center text-danger">{Error}</div>)}

					<Button 
					variant="orange" 
					className="btn-block w-100" 
					type="submit" 
					disabled={!UserType || !Agreement || !email || !password || !username || !tel || isLoading}
					onClick={!isLoading ? handleSubmit : null}>

					{isLoading ? (
							<>
								<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
							</>
						) : (
							'הרשמה'
						)}
						
					</Button>
				</div>
				
				<p className="dont-have-account text-center mt-2 link" onClick={gotoLoginPage}>
				כבר יש לך חשבון? התחבר/י פה
				</p>
				{/* </div>
			</form>
		</div> */}
        

		
        </BlankPage>
	);
};

export default Signup;