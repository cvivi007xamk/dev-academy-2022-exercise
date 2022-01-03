import React, { useState, useEffect } from "react";
import axios from "axios";
import { getData, createRow, updateRow } from "./requests/requests";
import "./App.css";
import EnhancedTable from "./components/EnhancedTable";
import MultipleSelect from "./components/MultipleSelect";
import Button from "@mui/material/Button";
import ChangeDates from "./components/ChangeDates";
import SensorCheckboxes from "./components/SensorCheckboxes";
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
	// const [data, setData] = useState([]);
	// const [url, setUrl] = useState(`http://localhost:3001/api/`);

	// const [farmNamesArray, setFarmNamesArray] = useState([]);
	// const [sensorsArray, setSensorsArray] = useState([
	// 	"pH",
	// 	"temperature",
	// 	"rainFall",
	// ]);
	// const [dataError, setDataError] = useState(null);
	// const [isLoaded, setIsLoaded] = useState(false);

	// // Set the startDate
	// const [startDate, setStartDate] = useState(
	// 	new Date("2018-12-31T22:00:00.000Z")
	// );

	// // Set the endDate
	// const [endDate, setEndDate] = useState(new Date());

	// useEffect(() => {
	// 	getData(url)
	// 		.then((newData) => {
	// 			setData(newData);
	// 			setIsLoaded(true);
	// 		})
	// 		.catch((error) => {
	// 			setDataError(error);
	// 		});
	// }, [url]);

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
