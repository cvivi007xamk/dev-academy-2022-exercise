import React, { useState, useEffect } from "react";
import axios from "axios";
import { getData, createRow, updateRow } from "../requests/requests";
import EnhancedTable from "../components/EnhancedTable";
import MultipleSelect from "../components/MultipleSelect";
import Button from "@mui/material/Button";
import ChangeDates from "../components/ChangeDates";
import SensorCheckboxes from "../components/SensorCheckboxes";
import {
	ThemeProvider,
	createTheme,
	responsiveFontSizes,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

function ShowInformation() {
	const [data, setData] = useState([]);
	const [url, setUrl] = useState(`http://localhost:3001/measurements`);

	const [farmNamesArray, setFarmNamesArray] = useState([
		"Friman Metsola collective",
		"Noora's farm",
		"Organic Ossi's Impact That Lasts plantase",
		"PartialTech Research Farm",
	]);
	const [sensorsArray, setSensorsArray] = useState([
		"pH",
		"temperature",
		"rainFall",
	]);
	const [dataError, setDataError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);

	// Set the startDate
	const [startDate, setStartDate] = useState(
		new Date("2018-12-31T22:00:00.000Z")
	);

	// Set the endDate
	const [endDate, setEndDate] = useState(new Date());

	useEffect(() => {
		getData(url)
			.then((newData) => {
				setData(newData);
				setIsLoaded(true);
			})
			.catch((error) => {
				setDataError(error);
			});
	}, [url]);

	return (
		<Box
			sx={{
				marginTop: "20px",
				marginBottom: "20px",
				textAlign: "center",
			}}
		>
			<Typography variant="h2" color="initial" gutterBottom="true">
				Filter information
			</Typography>
			<MultipleSelect
				farmNamesArray={farmNamesArray}
				setFarmNamesArray={setFarmNamesArray}
			/>

			<SensorCheckboxes
				sensorsArray={sensorsArray}
				setSensorsArray={setSensorsArray}
			/>
			{/* <Button
				variant="contained"
				sx={{
					marginTop: "20px",
					marginBottom: "20px",
				}}
				onClick={() =>
					setUrl(`http://localhost:3001/api/sensor/${sensorsArray}`)
				}
			>
				Change Sensors
			</Button> */}
			<ChangeDates
				setStartDate={setStartDate}
				setEndDate={setEndDate}
				startDate={startDate}
				endDate={endDate}
			/>

			<Button
				variant="contained"
				sx={{
					marginTop: "10px",
					marginBottom: "40px",
				}}
				onClick={() =>
					setUrl(
						`http://localhost:3001/meaurements?farms=${farmNamesArray}&sensors=${sensorsArray}&startDate=${startDate}&endDate=${endDate}`
					)
				}
			>
				Filter
			</Button>
			<EnhancedTable data={data} />
		</Box>
	);
}

export default ShowInformation;
