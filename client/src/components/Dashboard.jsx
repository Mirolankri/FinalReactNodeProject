import React, { useEffect,useContext} from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../users/providers/UserProvider";
import PageHeader from "./PageHeader";
import { Button, Container } from "react-bootstrap";
// import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Google from './Buttons/SignInButtons/google';
import { FindUserType, OptionUserType } from "../users/const/userconst";

const Dashboard = () => {
	// const { userData } = useContext(UserContext);
    const {userData,useUserType} = useUser()
	// console.log(userData);
	const navigate = useNavigate();

	useEffect(() => {
		const checkUser = () => {
			if (!localStorage.getItem("username")) {
				navigate("/login");
			}
		};
		checkUser();
	}, [navigate]);
	let findname = FindUserType(useUserType)
	// console.log(findname);
	// console.log(FindUserType(useUserType));
// console.log(OptionUserType.find(type => type.value == Number(useUserType)));
	return (
        <Container fluid>
			<PageHeader _title={"דף הבית"}/>
			<h2 style={{ margin: "0px",textAlign:"center" }}>
				שלום,{userData && `שם משתמש ${userData.username}`}
				<br></br>
				סוג { findname && findname.name}
				

				{/* <GoogleOAuthProvider clientId="213352614385-gk8iuql2eok33cisjg8mt6l5iil2c2fa.apps.googleusercontent.com">
          			<Google />
        		</GoogleOAuthProvider> */}
				{/* Hello, {localStorage.getItem("username")} */}
			</h2>
        </Container>
	);
};

export default Dashboard;