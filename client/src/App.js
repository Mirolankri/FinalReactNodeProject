import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import PhoneVerify from "./components/PhoneVerify";
import { UserProvider } from "./providers/UserProvider";
import Profile from "./components/Profile";
import Layout from "./Layout/Layout";
import Billing from "./components/Billing";

function App() {
	return (
		<UserProvider>
			<BrowserRouter>
				<Layout>
					<Routes>
						
						<Route path='/' element={<Dashboard />} />
						<Route path='/login' element={<Login />} />
						<Route path='/profile' element={<Profile />} />
						<Route path='/Billing' element={<Billing />} />
						<Route path='/register' element={<Signup />} />
						<Route path='/phone/verify' element={<PhoneVerify />} />
					</Routes>
				</Layout>
			</BrowserRouter>
		</UserProvider>
	);
}

export default App;