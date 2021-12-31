import React, { useState, useEffect } from "react";
import axios from "axios";
import { callFarmData, callInitialData } from "./requests/call";
import "./App.css";
import EnhancedTable from "./components/EnhancedTable";
import MultipleSelect from "./components/MultipleSelect";
import Button from "@mui/material/Button";

function App() {
	const [data, setData] = useState([]);
	const [farmNames, setFarmNames] = useState([]);
	console.log(farmNames);
	console.log(data);

	const setInitialDataAsync = async () => {
		const newData = await callInitialData();
		setData(newData);
		console.log(newData);
	};

	useEffect(() => {
		setInitialDataAsync();
	}, []);

	const setDataAsync = async () => {
		const newData = await callFarmData(farmNames[0]);
		setData(newData);
		console.log(newData);
	};

	return (
		<div className="App">
			<div>
				<pre>{!data ? "Loading..." : JSON.stringify(data)}</pre>
			</div>
			<div>
				<MultipleSelect
					farmNames={farmNames}
					setFarmNames={setFarmNames}
				/>
			</div>
			<div>
				<Button variant="contained" onClick={() => setDataAsync()}>
					Change Farms
				</Button>
			</div>
			<EnhancedTable data={data} />
		</div>
	);
}

export default App;
