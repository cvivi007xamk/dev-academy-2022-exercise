import React from "react";
import "./App.css";
import {
	ThemeProvider,
	createTheme,
	responsiveFontSizes,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Route, Routes } from "react-router-dom";
import ModifyInformation from "./pages/ModifyInformation";
import ShowInformation from "./pages/ShowInformation";
import Navigation from "./components/Navigation";

function App() {
	let themeLight = createTheme({
		mode: "light",

		// palette: {
		// 	background: {},
		// 	text: {},
		// 	primary: {},
		// 	secondary: {},
		// },

		typography: {
			fontFamily: [
				"-apple-system",
				"BlinkMacSystemFont",
				'"Segoe UI"',
				'"Helvetica Neue"',
				"Arial",
				"sans-serif",
				'"Apple Color Emoji"',
				'"Segoe UI Emoji"',
				'"Segoe UI Symbol"',
			].join(","),
		},
	});

	themeLight = responsiveFontSizes(themeLight);

	return (
		<React.Fragment>
			<ThemeProvider theme={themeLight}>
				<CssBaseline />
				<Navigation />
				<Routes>
					<Route path="/" element={<ShowInformation />} />

					<Route path="/modify/*" element={<ModifyInformation />} />
				</Routes>
			</ThemeProvider>
		</React.Fragment>
	);
}

export default App;
