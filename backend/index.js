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

//const latestData = postgres.getLatestData(10);
app.get("/api", async (req, res) => {
	res.send(await postgres.getLatestData(10));
});

app.get("/api/farm/:farmNamesArray", async (req, res) => {
	res.send(await postgres.getFarmData(req.params.farmNamesArray));
});

app.get("/api/sensor/:sensorsArray", async (req, res) => {
	res.send(await postgres.getSensorData(req.params.sensorsArray));
});

app.get("/api/date/:startDate/:endDate", async (req, res) => {
	res.send(
		await postgres.getDataBetweenDates(
			req.params.startDate,
			req.params.endDate
		)
	);
});

app.post("/api", async (req, res) => {
	try {
		const body = req.body;
		if (!body.content) {
			return res.status(400).json({
				error: "Request body content missing.",
			});
		}
		await postgres.createDataRow(body.content);
		res.json(body.content);
	} catch (error) {
		res.end(error.message || e.toString());
	}
});

app.put("/api/rows/:id", async (req, res) => {
	try {
		const body = req.body;
		if (!body.content) {
			return res.status(400).json({
				error: "Request body content missing.",
			});
		}
		await postgres.updateDataRow(req.params.id, body.content);
		res.json(body.content);
	} catch (error) {
		res.end(error.message || e.toString());
	}
});

app.delete("/api/rows/:id", async (req, res) => {
	try {
		await postgres.deleteDataRow(req.params.id);
		res.json(body.content);
	} catch (error) {
		res.end(error.message || e.toString());
	}
});

const PORT = 3001;
//app.listen(PORT);
app.listen(PORT, function (err) {
	if (err) console.log("Error in server setup");
	parseAndWriteData();
});
console.log(`Server running on port ${PORT}`);
