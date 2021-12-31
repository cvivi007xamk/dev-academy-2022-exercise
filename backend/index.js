const express = require("express");
const app = express();
const fs = require("fs");
const { parse } = require("csv-parse");
const path = require("path");
const { stringify } = require("csv-stringify");
const postgres = require("./postgres");
const csvFunctions = require("./csvFunctions");
const cors = require("cors");
const axios = require("axios");

app.use(cors());
app.use(express.json());

// // Endpoints to fetch data from farms with different granularities (by month, by metric)
// // Aggregate calculation endpoints, endpoint which returns monthly averages, min/max and other statistical analysis
// monthlyData = "Data";

// app.get("/", (req, res) => {
// 	res.send("<h1>Hello World!</h1>");
// });

// app.get("/api/monthly", (req, res) => {
// 	res.send(monthlyData);
// });

// ## Validation rules
// * Accept only temperature,rainfall and PH data. Other metrics should be discarded
// * Discard invalid values with next rules
// * pH is a decimal value between 0 - 14
// * Temperature is a celsius value between -50 and 100
// * Rainfall is a positive number between 0 and 500
// * Data may be missing from certain dates

//Put your csv-files path here...
const filesDirectory = path.join(__dirname, "/csvFiles/");

// Read the csv-files, parse and validate them. And finally write them to Postgres database.

const parseAndWriteData = async () => {
	let promiseFilenames = csvFunctions.readDirectory(filesDirectory);
	let filenames = await promiseFilenames;
	let csvData = csvFunctions.getDataFromFiles(filenames, filesDirectory);
	postgres.writeDataToDB(csvData);
};
//parseAndWriteData();

const latestData = postgres.getLatestData(10);
app.get("/api", async (req, res) => {
	console.log("latestData from index.js", latestData);
	res.send(await latestData);
});

app.get("/api/:farmName", async (req, res) => {
	res.send(await postgres.getFarmData(req.params.farmName));
});

app.get("/api/:sensor", async (req, res) => {
	res.send(await postgres.getSensorData(req.params.sensor));
});

app.get("/api/:startDate/:endDate", async (req, res) => {
	res.send(
		await postgres.getDataBetweenDates(
			req.params.startDate,
			req.params.endDate
		)
	);
});

// app.get('/item/:name', async function (req, res) {
//     res.send(await findItemByName(req.params.name));
//   });

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
