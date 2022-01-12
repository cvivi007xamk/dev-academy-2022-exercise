import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Tabs, Tab } from "@mui/material";

function Navigation(props) {
	const [value, setValue] = useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<AppBar
			sx={{
				position: "sticky",
				top: 0,
				height: 50,
				zIndex: 5,
				bgcolor: "background.paper",
			}}
		>
			<Tabs value={value} onChange={handleChange} centered>
				<Tab component={Link} to="" label="Show data" />
				<Tab component={Link} to="modify" label="Modify data" />
			</Tabs>
		</AppBar>
	);
}

export default Navigation;
