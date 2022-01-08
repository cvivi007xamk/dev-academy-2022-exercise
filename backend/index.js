const express = require("express");
const app = express();
const {
	seedMeasurementDataToDB,
	seedFarmDataToDB,
	seedSensorDataToDB,
	initRelationsToDB,
	farms,
	sensors,
} = require("./config/db-seed");
const path = require("path");
const { getDataFromFiles, modifyDataForDb } = require("./csv/csv-read");
const cors = require("cors");
const farmRouter = require("./routes/farm-routes");
const measurementRouter = require("./routes/measurement-routes");
const sensorRouter = require("./routes/sensor-routes");

// Your directory containing the csv files goes here.
const filesDirectory = path.join(__dirname, "./csv/csvFiles/");

var corsOptions = {
	origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(farmRouter);
app.use(measurementRouter);
app.use(sensorRouter);

const PORT = 3001;
//app.listen(PORT);
app.listen(PORT, async function (err) {
	if (err) console.log("Error in server setup");
	let measurements = await getDataFromFiles(filesDirectory);

	(async () => {
		await initRelationsToDB();
		await seedFarmDataToDB(farms);
		await seedSensorDataToDB(sensors);
		await seedMeasurementDataToDB(measurements);
	})();
});
console.log(`Node.js server running on port ${PORT}`);
