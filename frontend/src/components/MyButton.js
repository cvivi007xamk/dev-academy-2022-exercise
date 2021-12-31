import React from "react";
import { Button } from "@mui/material";

// Reusable button that handles the onClick set in props and with text that is the child of the element.
const MyButton = (props) => {
	return (
		<Button
			color="primary"
			size="large"
			variant="contained"
			onClick={props.onClick}
		>
			{props.children}
		</Button>
	);
};
export default MyButton;
