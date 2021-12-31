import React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import fi from "date-fns/locale/fi";
import DatePicker from "@mui/lab/DatePicker";
import { Box, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const CssTextField = styled(TextField)({
	"& label.Mui-focused": {
		color: "primary.main",
	},
	// "& .MuiInput-underline:after": {
	// 	borderBottomColor: "primary.main",
	// },
	"& .MuiOutlinedInput-root": {
		"& fieldset": {
			borderColor: "secondary.contrastText",
		},
		"&:hover fieldset": {
			borderColor: "primary.main",
		},
		"&.Mui-focused fieldset": {
			borderColor: "primary.main",
		},
	},
});

const ChangeDates = (props) => {
	// Get the default values for the datepickers.
	let today = new Date();
	let firstDate = new Date("2018-12-31T22:00:00.000Z");
	const [startValue, setStartValue] = React.useState(firstDate);
	const [endValue, setEndValue] = React.useState(today);

	return (
		<Box>
			<LocalizationProvider dateAdapter={AdapterDateFns} locale={fi}>
				<DatePicker
					disableMaskedInput={true}
					label="Start date:"
					maxDate={endValue}
					defaultValue={firstDate}
					value={startValue}
					onChange={(newValue) => {
						props.setStartDate(newValue.toISOString());
						setStartValue(newValue);
					}}
					renderInput={(params) => (
						<CssTextField
							{...params}
							helperText="dd.mm.yyyy"
							sx={{
								marginTop: "20px",
								marginBottom: "20px",
							}}
						/>
					)}
				/>
				<br />
				<DatePicker
					disableMaskedInput={true}
					label="End date:"
					minDate={startValue}
					maxDate={today}
					defaultValue={today}
					value={endValue}
					onChange={(newValue) => {
						props.setEndDate(newValue.toISOString());
						setEndValue(newValue);
					}}
					renderInput={(params) => (
						<CssTextField
							{...params}
							helperText="dd.mm.yyyy"
							sx={{ marginTop: "20px", marginBottom: "20px" }}
						/>
					)}
				/>
			</LocalizationProvider>
		</Box>
	);
};

export default ChangeDates;
