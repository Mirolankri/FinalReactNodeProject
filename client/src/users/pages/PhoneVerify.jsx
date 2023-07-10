import React, { useState,useRef,useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';

import { UserContext, useUser } from "../providers/UserProvider"
import axios from "axios";
import BlankPage from "./BlankPage";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import ToggleButton from "react-bootstrap/esm/ToggleButton";
import { OptionUserType } from "../const/userconst";


const PhoneVerify = () => {
	axios.defaults.withCredentials = true;

	const [code, setCode] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [ShowAskPage, setShowAskPage] = useState(false);
	const {setUserData,login,userData,isAskUserType,useUserType, setuseUserType} = useUser()


	console.log("isAskUserType",isAskUserType);
    const inputRef = useRef(null);
	const navigate = useNavigate();

    useEffect(() => {
		if(!userData) navigate("/login")
        if (inputRef.current && inputRef.current.value.length === 6) {
          // Trigger button click event
          document.querySelector('.SendOTP').click();
        }
      }, [code]);

	const postVerification = async () => {
        console.log(code);

		const body = {code};
    	const headers = { 
        // 'Authorization': 'Bearer my-token',
        "Content-Type": "application/json",
    	};
	
    	axios.post(`${process.env.REACT_APP_DOMAIN}/user/verification`, body, { headers:headers })
        .then(response => {
			console.log(" response axios",response);
			if (response.data.error_message) {
				alert(response.data.error_message);
				setLoading(false);
			} else {
				// navigate("/");
				if(isAskUserType)
					return setShowAskPage(true)

				navigate("/");


			}
		})
		.catch((err) => console.error(err));
	};
	const HandleSetUserType = (e) => {
		// console.log(e.currentTarget.value);

		setuseUserType(e.currentTarget.value)
		// console.log("useUserType",useUserType);

		navigate("/");
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		postVerification();
		setCode("");
	};
	return (
		<BlankPage>
			<h3 className="Auth-form-title">{userData && userData.username}</h3>

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