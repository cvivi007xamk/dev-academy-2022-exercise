import React, { useState, useEffect } from "react";
import axios from "axios";
import { callFarmData, callInitialData } from "./requests/call";
import "./App.css";
import EnhancedTable from "./components/EnhancedTable";
import MultipleSelect from "./components/MultipleSelect";
import Button from "@mui/material/Button";
import ChangeDates from "./components/ChangeDates";
import SensorCheckboxes from "./components/SensorCheckboxes";

function App() {
	const [data, setData] = useState([]);
	const [url, setUrl] = useState(`http://localhost:3001/api/`);

	const [farmNamesArray, setFarmNamesArray] = useState([]);
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

	console.log("sensorsArray", sensorsArray);

	const callAndSetData = async (endpoint) => {
		try {
			const response = await axios.get(endpoint);
			const newData = await response.data;
			setData(newData);
			setIsLoaded(true);
		} catch (error) {
			setDataError(error.response.data.error);
		}
	};

	useEffect(() => {
		callAndSetData(url);
	}, [url]);

	return (
		<div className="App">
			<div>
				<MultipleSelect
					farmNamesArray={farmNamesArray}
					setFarmNamesArray={setFarmNamesArray}
				/>
				<Button
					variant="contained"
					sx={{
						marginTop: "20px",
						marginBottom: "20px",
					}}
					onClick={() =>
						setUrl(
							`http://localhost:3001/api/farm/${farmNamesArray}`
						)
					}
				>
					Change Farms
				</Button>

				<SensorCheckboxes
					sensorsArray={sensorsArray}
					setSensorsArray={setSensorsArray}
				/>
				<Button
					variant="contained"
					sx={{
						marginTop: "20px",
						marginBottom: "20px",
					}}
					onClick={() =>
						setUrl(
							`http://localhost:3001/api/sensor/${sensorsArray}`
						)
					}
				>
					Change Sensors
				</Button>
				<ChangeDates
					setStartDate={setStartDate}
					setEndDate={setEndDate}
					startDate={startDate}
					endDate={endDate}
				/>
				<Button
					variant="contained"
					sx={{
						marginTop: "20px",
						marginBottom: "20px",
					}}
					onClick={() =>
						setUrl(
							`http://localhost:3001/api/date/${startDate}/${endDate}`
						)
					}
				>
					Change Date Range
				</Button>
			</div>
			<div></div>
			<EnhancedTable data={data} />
		</div>
	);
}

export default App;
