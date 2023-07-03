import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./users/providers/UserProvider";
import Layout from "./Layout/Layout";
import Router from "./routes/Router";

function App() {
	return (
		<BrowserRouter>
			<UserProvider>
				<Layout>
					<Router/>
				</Layout>
			</UserProvider>
		</BrowserRouter>
	);
}

export default App;