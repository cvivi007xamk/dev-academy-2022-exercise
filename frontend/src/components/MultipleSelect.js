import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 500,
		},
	},
};

const names = [
	"Friman Metsola collective",
	"Noora's farm",
	"Organic Ossi's Impact That Lasts plantase",
	"PartialTech Research Farm",
];

function getStyles(name, farmNames, theme) {
	return {
		fontWeight:
			farmNames.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

export default function MultipleSelect(props) {
	const theme = useTheme();

	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		props.setFarmNamesArray(
			// On autofill we get a stringified value.
			typeof value === "string" ? value.split(",") : value
		);
	};

	return (
		<div>
			<FormControl sx={{ m: 1, width: 500 }}>
				<InputLabel id="farm-select">Select Farms</InputLabel>
				<Select
					labelId="farm-select"
					id="farm-select"
					multiple
					value={props.farmNamesArray}
					onChange={handleChange}
					input={
						<OutlinedInput
							id="farm-select-multiple-chip"
							label="Select Farms"
						/>
					}
					renderValue={(selected) => (
						<Box
							sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
						>
							{selected.map((value) => (
								<Chip key={value} label={value} />
							))}
						</Box>
					)}
					MenuProps={MenuProps}
				>
					{names.map((name) => (
						<MenuItem
							key={name}
							value={name}
							style={getStyles(name, props.farmNamesArray, theme)}
						>
							{name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}
