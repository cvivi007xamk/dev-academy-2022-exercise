import React, { useState, useEffect } from "react";
import axios from "axios";

import logo from "./logo.svg";
import "./App.css";
import EnhancedTable from "./components/DataTable2";

function App() {
	const [data, setData] = useState(null);

	useEffect(() => {
		axios.get("http://localhost:3001/api").then((response) => {
			console.log("promise fulfilled");
			setData(response.data);
		});
	}, []);
	console.log(data);

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<div>
					<pre>{!data ? "Loading..." : JSON.stringify(data)}</pre>
				</div>
			</header>
			<EnhancedTable />
		</div>
	);
}

export default App;
