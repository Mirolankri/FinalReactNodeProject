import React, { useState,useRef,useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';

import { UserContext, useUser } from "../providers/UserProvider"
import axios from "axios";
import BlankPage from "./BlankPage";


const PhoneVerify = () => {
	axios.defaults.withCredentials = true;

	const [code, setCode] = useState("");
    const [isLoading, setLoading] = useState(false);
	const {setUserData,login,userData} = useUser()


    const inputRef = useRef(null);
	const navigate = useNavigate();

    useEffect(() => {
		if(!userData) navigate("/login")
        if (inputRef.current && inputRef.current.value.length === 6) {
          // Trigger button click event
          document.querySelector('.SendOTP').click();
        // console.log("fdf");
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
				navigate("/");
				// console.log("navigate");
			}
		})
		.catch((err) => console.error(err));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		postVerification();
		setCode("");
	};
	return (
		<BlankPage>
{/* <div className="Auth-form-container">
			<form className="Auth-form"> */}
				{/* <div className="Auth-form-content"> */}
				<h3 className="Auth-form-title">{userData && userData.username} <br/> Verify your Phone number</h3>
				<Form.Floating className="mt-3">
				<Form.Control
				id="code"
				type="text"
				placeholder="Enter Your Code"
				name="code"
				value={code}
				required
				onChange={(e) => setCode(e.target.value)}
				maxLength={6}
				ref={inputRef}
				/>
        		<label htmlFor="code">Enter OTP Code</label>
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
							Verify Your Code... <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
							</>
						) : (
							'Log in'
						)}
						
					</Button>
				</div>
				<p className="dont-have-account text-right mt-2">
				Don't Get an Code?{" "}
						<span className='link'>
							Click here
						</span>
				</p>
				{/* </div> */}
			{/* </form>
		</div> */}
		</BlankPage>

	);
};

export default PhoneVerify;