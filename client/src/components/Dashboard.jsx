import React, { useEffect,useContext} from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../providers/UserProvider";
import PageHeader from "./PageHeader";
import { Container } from "react-bootstrap";
// import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Google from './Buttons/SignInButtons/google';


const Dashboard = () => {
	// const { userData } = useContext(UserContext);
    const {userData} = useUser()
	console.log(userData);
	const navigate = useNavigate();

	useEffect(() => {
		console.log(userData);
		const checkUser = () => {
			if (!localStorage.getItem("username")) {
				navigate("/login");
			}
		};
		checkUser();
	}, [navigate]);

	

	return (
        <Container fluid>
			<PageHeader _title={"דף הבית"}/>
			<h2 style={{ margin: "0px",textAlign:"center" }}>
				Hello,{userData && `user name ${userData.username}`}
				<GoogleOAuthProvider clientId="213352614385-gk8iuql2eok33cisjg8mt6l5iil2c2fa.apps.googleusercontent.com">
          			<Google />
        		</GoogleOAuthProvider>
				{/* Hello, {localStorage.getItem("username")} */}
			</h2>
        </Container>
	);
};

export default Dashboard;