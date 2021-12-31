import * as React from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";

export default function SensorCheckboxes(props) {
	const [checked, setChecked] = React.useState(true);

	const [sensors, setSensors] = React.useState({
		pH: true,
		temperature: true,
		rainFall: true,
	});

	const handleChange = (event) => {
		setSensors({
			...sensors,
			[event.target.name]: event.target.checked,
		});
		let helpArray = [...props.sensorsArray];

		if (props.sensorsArray.includes(event.target.name)) {
			var removedIndex = props.sensorsArray.indexOf(event.target.name);
			helpArray.splice(removedIndex, 1);
		} else helpArray.push(event.target.name);
		props.setSensorsArray(helpArray);
	};

	console.log("props.sensorsArray", props.sensorsArray);

	const { pH, temperature, rainFall } = sensors;

	// const handleChange = (event) => {
	// 	setChecked(event.target.checked);
	// };

	return (
		<Box sx={{ margin: "auto" }}>
			<FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
				<FormLabel component="legend">Sensor types</FormLabel>
				<FormGroup>
					<FormControlLabel
						control={
							<Checkbox
								checked={pH}
								onChange={handleChange}
								name="pH"
							/>
						}
						label="pH value"
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={temperature}
								onChange={handleChange}
								name="temperature"
							/>
						}
						label="Temperature"
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={rainFall}
								onChange={handleChange}
								name="rainFall"
							/>
						}
						label="Rainfall"
					/>
				</FormGroup>
				<FormHelperText>
					Show the data from these sensor types.
				</FormHelperText>
			</FormControl>
		</Box>
	);
}
