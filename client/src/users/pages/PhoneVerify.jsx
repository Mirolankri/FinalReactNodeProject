import React, { useState,useRef,useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';

import { UserContext, useUser } from "../providers/UserProvider"
import BlankPage from "./BlankPage";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import ToggleButton from "react-bootstrap/esm/ToggleButton";
import { OptionUserType } from "../const/userconst";
import Users from "../service/usersApiService";


const PhoneVerify = () => {
	const UsersInstance = new Users()

	const [code, setCode] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [ShowAskPage, setShowAskPage] = useState(false);
	const [Error, setError] = useState("");

	const {setUserData,userData,isAskUserType,useUserType, setuseUserType,SetLocalStorage} = useUser()

    const inputRef = useRef(null);
	const navigate = useNavigate();

    useEffect(() => {
		if(!userData) navigate("/login")
		if(userData.SignWith) setShowAskPage(true)

		console.log("userData",userData);
        if (inputRef.current && inputRef.current.value.length === 6) {
          // Trigger button click event
          document.querySelector('.SendOTP').click();
        }
      }, [code]);

	const postVerification = async () => {
		const body = {code};
		UsersInstance
		.OTPVerification(body)
		.then(response=>{
			SetLocalStorage(response)
			if(isAskUserType) return setShowAskPage(true)

			navigate("/");

		}).catch(error=>{
			// console.info(error);
			setLoading(false);
			return setError(error.response.data)
		})
	};
	const HandleSetUserType = (e) => {
		setuseUserType(e.currentTarget.value)
		navigate("/");
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		setError("")
		setLoading(true);
		postVerification();
		setCode("");
	};
	return (
		<BlankPage>
			<h3 className="Auth-form-title">{userData && userData.username}</h3>
			{Error && (<div className="mt-3 text-center text-danger">{Error}</div>)}
			{ShowAskPage ? (
				<>
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
						// checked={useUserType === radio.value}
						onChange={HandleSetUserType}
						
					>
						{radio.name}
					</ToggleButton>
					))}
				</ButtonGroup>
				</Form.Group>
				</>
			):(<>
				<Form.Floating className="mt-3">
					<Form.Control
					id="code"
					type="text"
					placeholder="יש להזין קוד"
					name="code"
					value={code}
					required
					onChange={(e) => setCode(e.target.value)}
					maxLength={6}
					ref={inputRef}
					/>
					<label htmlFor="code">יש להזין קוד</label>
      			</Form.Floating>
			
				<div className="d-grid gap-2 mt-3">
					<Button 
					style={{backgroundColor:"#FF8A00"}}
					variant="" 
					className="btn-block w-100 SendOTP" 
					type="submit" 
					disabled={!code || isLoading}
					onClick={!isLoading ? handleSubmit : null}>

					{isLoading ? (
							<>
							מאמת את הקוד שלך... <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
							</>
						) : (
							'התחברות'
						)}
						
					</Button>
				</div>
				<p className="dont-have-account text-right mt-2">
					לא קיבלת קוד?{" "}
						<span className='link'>
						לחץ/י כאן
						</span>
				</p>
			</>)}
				

		</BlankPage>

	);
};

export default PhoneVerify;