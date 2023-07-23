import React, { useEffect,useContext} from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../users/providers/UserProvider";
import PageHeader from "./PageHeader";
import { Button, Container } from "react-bootstrap";
// import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Google from './Buttons/SignInButtons/google';
import { FindUserType, OptionUserType } from "../users/const/userconst";
import HomePageOwner from "../page/HomePageOwner";
import HomePageDogWalker from "../page/HomePageDogWalker";

const Dashboard = () => {
	// const { userData } = useContext(UserContext);
    const {userData,useUserType} = useUser()
	// console.log(userData);
	const navigate = useNavigate();

	useEffect(() => {
		const checkUser = () => {
			console.log("userData",userData,useUserType);
			if (!localStorage.getItem("username")) {
				navigate("/login");
			}
		};
		checkUser();
	}, [navigate]);

	let findname = FindUserType(useUserType)
	const components = {HomePageOwner,HomePageDogWalker};
	const DynamicComponent = components[findname.componentname];
	return (
        <Container fluid>
			<PageHeader _title={`דף בית ${findname.name}`}/>
			{ findname && <DynamicComponent />}
				{/* <GoogleOAuthProvider clientId="213352614385-gk8iuql2eok33cisjg8mt6l5iil2c2fa.apps.googleusercontent.com">
          			<Google />
        		</GoogleOAuthProvider> */}
				{/* Hello, {localStorage.getItem("username")} */}
			
        </Container>
	);
};

export default Dashboard;