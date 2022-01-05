const path = require("path");
const csv = require("../csv/csv-read");
const db = require("../config/db-config.js");

const Measurement = require("../models/measurement-model");
const Farm = require("../models/farm-model");
const Sensor = require("../models/sensor-model");

const filesDirectory = path.join(__dirname, "../csv/csvFiles/");

const writeMeasurementDataToDB = async (data) => {
	await db.sync({ force: true });
	await Measurement.bulkCreate(data);
};

const seedData = async () => {
	let filenames = await csv.readDirectory(filesDirectory);
	let csvData = csv.getDataFromFiles(filenames, filesDirectory);
	writeMeasurementDataToDB(csvData);
};

module.exports = seedData;
