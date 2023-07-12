import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./users/providers/UserProvider";
import Layout from "./Layout/Layout";
import Router from "./routes/Router";
import { ThemeProvider } from "react-bootstrap";
import { lightTheme, darkTheme } from './theme/theme';

// import ThemeProvider from 'react-bootstrap/ThemeProvider';

function App() {	  
	return (
		<BrowserRouter>
			<UserProvider>
				<ThemeProvider dir="rtl" prefixes={{ bs: 'custom' }} theme={lightTheme}>
					<Layout>
						<Router/>
					</Layout>
				</ThemeProvider>
			</UserProvider>
		</BrowserRouter>
	);
}

export default App;