import React, { useEffect,useContext} from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../users/providers/UserProvider";
import PageHeader from "./PageHeader";
import { Container } from "react-bootstrap";


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

				{/* Hello, {localStorage.getItem("username")} */}
			</h2>
        </Container>
	);
};

export default Dashboard;