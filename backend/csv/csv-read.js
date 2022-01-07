const fs = require("fs");
const fsp = require("fs").promises;
const { parse } = require("csv-parse");
const path = require("path");
const { stringify } = require("csv-stringify");

// Function to change the type of value in csv-file
const changeType = (csvRow) => {
	csvRow.value = Number(csvRow.value);
	return csvRow;
};
const useIdNum = (data) => {
	if (data.FarmId === "Noora's farm") {
		data.FarmId = 1;
	}
	if (data.FarmId === "Friman Metsola collective") {
		data.FarmId = 2;
	}
	if (data.FarmId === "Organic Ossi's Impact That Lasts plantase") {
		data.FarmId = 3;
	}
	if (data.FarmId === "PartialTech Research Farm") {
		data.FarmId = 4;
	}
	if (data.SensorId === "temperature") {
		data.SensorId = 1;
	}
	if (data.SensorId === "rainFall") {
		data.SensorId = 2;
	}
	if (data.SensorId === "pH") {
		data.SensorId = 3;
	}

	return data;
};

// Function to validate the data read from csv-files. Returns true if row is validated and false if there is a problem.
const validateCSV = (csvRow) => {
	if (
		csvRow.SensorId != "temperature" &&
		csvRow.SensorId != "rainFall" &&
		csvRow.SensorId != "pH"
	)
		return false;
	if (
		csvRow.SensorId == "pH" &&
		(Number(csvRow.value) < 0 || Number(csvRow.value) > 14)
	)
		return false;
	if (
		csvRow.SensorId == "temperature" &&
		(Number(csvRow.value) < -50 || Number(csvRow.value) > 100)
	)
		return false;
	if (
		csvRow.SensorId == "rainFall" &&
		(Number(csvRow.value) < 0 || Number(csvRow.value) > 500)
	)
		return false;
	else return true;
};

// Function to read the csv-files data to an array of objects (and then write that data to PostgreSQL table)
const getDataFromFiles = async (filesDirectory) => {
	let filenames = await fsp.readdir(filesDirectory);

	console.log("filenames = ", filenames);
	filenames = filenames.filter(
		(filename) => path.extname(filename) == ".csv"
	);
	var csvData = [];

	for (let i = 0; i < filenames.length; i++) {
		let currFilePath = filesDirectory + filenames[i];

		fs.createReadStream(currFilePath)
			.pipe(
				parse({
					delimiter: ",",
					columns: ["FarmId", "datetime", "SensorId", "value"],
					skip_records_with_empty_values: true,
				})
			)
			.on("data", function (csvrow) {
				//console.log(csvrow);
				//do something with csvrow
				if (validateCSV(csvrow) == true)
					csvData.push(useIdNum(changeType(csvrow)));
				else
					console.log(
						"Validation error on row",
						csvrow,
						"Skipping this row."
					);
			})
			.on("end", function () {
				//do something with csvData
				console.log(
					"Rows from file",
					currFilePath,
					"parsed into csvData array"
				);

				// If the file is the last one to read from, then write the data to a Postgres database.

				if (i == filenames.length - 1) {
					// Also make a new csv file that has all the data.
					stringify(
						csvData,
						{
							header: true,
						},
						function (err, output) {
							fs.writeFile("./allData.csv", output, () => {});
						}
					);
				}
			});
	}

	return csvData;
};

const modifyDataForDb = (data) => {
	for (let i = 0; i < data.length; i++) {
		if (data[i].location === "Noora's farm") {
			data[i].location = "1";
		}
		if (data[i].location === "Friman Metsola collective") {
			data[i].location = "2";
		}
		if (data[i].location === "Organic Ossi's Impact That Lasts plantase") {
			data[i].location = "3";
		}
		if (data[i].location === "PartialTech Research Farm") {
			data[i].location = "4";
		}
		if (data[i].sensorType === "temperature") {
			data[i].sensorType = "1";
		}
		if (data[i].sensorType === "rainFall") {
			data[i].sensorType = "2";
		}
		if (data[i].sensorType === "pH") {
			data[i].sensorType = "3";
		}
	}
	return data;
};

module.exports = { getDataFromFiles, modifyDataForDb };
