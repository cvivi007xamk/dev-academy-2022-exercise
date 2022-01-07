const fs = require("fs");
const fsp = require("fs").promises;
const { parse } = require("csv-parse");
const path = require("path");
const { stringify } = require("csv-stringify");

const filesDirectory = path.join(__dirname, "./csvFiles/");

//Function to get the filenames present in the directory
const readDirectory = (dirname) => {
	return new Promise((resolve, reject) => {
		fs.readdir(dirname, (error, filenames) => {
			if (error) {
				reject(error);
			} else {
				resolve(filenames);
			}
		});
	});
};

// Function to change the type of value in csv-file
const changeType = (csvRow) => {
	csvRow.value = Number(csvRow.value);
	return csvRow;
};

// Function to validate the data read from csv-files. Returns true if row is validated and false if there is a problem.
const validateCSV = (csvRow) => {
	if (
		csvRow.sensorType != "temperature" &&
		csvRow.sensorType != "rainFall" &&
		csvRow.sensorType != "pH"
	)
		return false;
	if (
		csvRow.sensorType == "pH" &&
		(Number(csvRow.value) < 0 || Number(csvRow.value) > 14)
	)
		return false;
	if (
		csvRow.sensorType == "temperature" &&
		(Number(csvRow.value) < -50 || Number(csvRow.value) > 100)
	)
		return false;
	if (
		csvRow.sensorType == "rainFall" &&
		(Number(csvRow.value) < 0 || Number(csvRow.value) > 500)
	)
		return false;
	else return true;
};

// Function to read the csv-files data to an array of objects (and then write that data to PostgreSQL table)
const getDataFromFiles = async (filesDirectory) => {
	let filenames;
	try {
		filenames = await fsp.readdir(filesDirectory);
	} catch (error) {
		console.log(error);
	}

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
					columns: true,
					skip_records_with_empty_values: true,
				})
			)
			.on("data", function (csvrow) {
				//console.log(csvrow);
				//do something with csvrow
				if (validateCSV(csvrow) == true)
					csvData.push(changeType(csvrow));
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
					//dataToWrite = csvData;
					//postgres.writeDataToDB(csvData);

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
//let filenames = readDirectory(filesDirectory)
const data = getDataFromFiles(filesDirectory);

// Function to read the csv-files data to an array of objects (and then write that data to PostgreSQL table)
const getDataFromFiles2 = (filenames, filesDirectory) => {
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
					columns: true,
					skip_records_with_empty_values: true,
				})
			)
			.on("data", function (csvrow) {
				//console.log(csvrow);
				//do something with csvrow
				if (validateCSV(csvrow) == true)
					csvData.push(changeType(csvrow));
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
					//dataToWrite = csvData;
					//postgres.writeDataToDB(csvData);

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

module.exports = data;