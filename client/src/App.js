import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./users/providers/UserProvider";
import Layout from "./Layout/Layout";
import Router from "./routes/Router";

function App() {
	return (
		<UserProvider>
			<BrowserRouter>
				<Layout>
					<Router/>
				</Layout>
			</BrowserRouter>
		</UserProvider>
	);
}

export default App;