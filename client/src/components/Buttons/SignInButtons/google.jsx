import React from 'react';

import { GoogleLogin } from '@react-oauth/google';
import Button from 'react-bootstrap/esm/Button';
import Users from '../../../users/service/usersApiService';
// import { useUser } from '../../../users/providers/UserProvider';
// import { useNavigate } from 'react-router-dom';

const google = ({CustomParam}) => {
	const {login,navigate,SetLocalStorage} = CustomParam;
	// const navigate = useNavigate();

  const postLoginDetails = (body) => {
	const UsersInstance = new Users();
	UsersInstance.Login(body)
	.then(response=>{
		console.log("response in google",response);
		login(response);
		SetLocalStorage(response)
		// navigate("/");
		navigate("/phone/verify");
	}).catch(error=>{
		console.info(error);
		// setLoading(false);
		// return setError(error.response.data)
	})

		// fetch(`${process.env.REACT_APP_DOMAIN}/user/login`, {
		// 	method: "POST",
		// 	body: JSON.stringify({
		// 		e
		// 	}),
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// })
		// 	.then((res) => res.json())
		// 	.then((data) => {
		// 		if (data.error_message) {
		// 			alert(data.error_message);
		// 		} else {
		// 			console.log(data.data);
					
		// 			// localStorage.setItem("username", data.data.username.username);
		// 			// login(data.data.userdata,data.data.token);
		// 			// navigate("/phone/verify");
		// 		}
		// 	})
		// 	.catch((err) => console.error(err));
	};
  const handleSubmit = async (e) => {
		// e.preventDefault();
		// console.log(e);
		// setLoading(true);
		// // return
		postLoginDetails(e);
		// setPassword("");
		// setEmail("");
	};

    return (
      <>
        <GoogleLogin theme="filled_black" text="signin_with" locale="he" shape="rectangular" type="standard" onSuccess={handleSubmit} onError={() => {
              console.log('Login Failed');
            }}
            />
					{/* <Button id='' variant="outline-dark" size="xs" className="" type="button">
						התחברות עם <i className="bi bi-google"></i>						
					</Button> */}
            {/* <div id="loginDiv"></div> */}
            </>
    )
}

export default google;