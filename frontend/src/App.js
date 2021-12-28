import React, { useState, useEffect } from "react";
import axios from "axios";

import logo from "./logo.svg";
import "./App.css";

function App() {
	const [data, setData] = useState(null);

	useEffect(() => {
		axios.get("http://localhost:3001/api").then((response) => {
			console.log("promise fulfilled");
			setData(response.data.message);
		});
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>{!data ? "Loading..." : data}</p>
			</header>
		</div>
	);
}

export default App;
