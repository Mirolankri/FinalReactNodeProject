import React, { useState,useRef,useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { UserContext, useUser } from "../users/providers/UserProvider"

const PhoneVerify = () => {
	const [code, setCode] = useState("");
    const [isLoading, setLoading] = useState(false);
	const {setUserData,login,userData} = useUser()


    const inputRef = useRef(null);

	const navigate = useNavigate();

    useEffect(() => {
        if (inputRef.current && inputRef.current.value.length === 6) {
          // Trigger button click event
          document.querySelector('.SendOTP').click();
        // console.log("fdf");
        }
      }, [code]);
	const postVerification = async () => {
        console.log(code);
		fetch(`${process.env.REACT_APP_DOMAIN}/user/verification`, {
			method: "POST",
			body: JSON.stringify({
				code
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
					navigate("/");
					// console.log("navigate");
				}
			})
			.catch((err) => console.error(err));
	};
	const handleSubmit = (e) => {
		setLoading(true);
        console.log("in handleSubmit",code);
        // return
		e.preventDefault();
        
		postVerification();
		setCode("");
	};
	return (
        <>
        <div className="Auth-form-container">
			<form className="Auth-form">
				<div className="Auth-form-content">
				<h3 className="Auth-form-title">{userData.username} Verify your Phone number</h3>
				<div className="form-group mt-3">
					<label htmlFor='code'>Enter OTP Code</label>
					<input
                        ref={inputRef}
						className="form-control mt-1"
						placeholder="Enter Your Code"
						type='text'
						id='code'
						name='code'
						value={code}
						required
                        maxLength={6}
						onChange={(e) => setCode(e.target.value)}
						// onChange={(e) => handleChange(e)}
                        // onChange={handleInputChange}
					/>
				</div>
				
				<div className="d-grid gap-2 mt-3">
					<Button 
					variant="primary" 
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
				</div>
			</form>
		</div>


        </>
	);
};

export default PhoneVerify;