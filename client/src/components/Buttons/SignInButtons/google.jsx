import React from 'react';

import { GoogleLogin } from '@react-oauth/google';

const google = () => {
  
  const postLoginDetails = (e) => {
		fetch(`${process.env.REACT_APP_DOMAIN}/user/login`, {
			method: "POST",
			body: JSON.stringify({
				e
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
					// login(data.data.userdata,data.data.token);
					// navigate("/phone/verify");
				}
			})
			.catch((err) => console.error(err));
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
        <GoogleLogin onSuccess={handleSubmit}
            onError={() => {
              console.log('Login Failed');
            }}
            />

            <div id="loginDiv"></div>
            </>
    )
}

export default google;