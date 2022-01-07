const path = require("path");
const db = require("../config/db-config.js");

const Measurement = require("../models/measurement-model");
const Farm = require("../models/farm-model");
const Sensor = require("../models/sensor-model");

const filesDirectory = path.join(__dirname, "../csv/csvFiles/");

let farms = [
	"Noora's farm",
	"Friman Metsola collective",
	"Organic Ossi's Impact That Lasts plantation",
	"PartialTech Research Farm",
];

let sensors = ["temperature", "rainFall", "pH"];
const seedMeasurementDataToDB = async (data) => {
	await db.sync({ force: true });
	await Measurement.bulkCreate(data);
};

const seedFarmDataToDB = async (data) => {
	await db.sync({ force: true });
	await Farm.bulkCreate(data);
};

const seedSensorDataToDB = async (data) => {
	await db.sync({ force: true });
	await Sensor.bulkCreate(data);
};

const initTablesToDB = async () => {
	await db.sync({ force: true });
	Farm.hasMany(Measurement);
	Measurement.belongsTo(Farm);
	Sensor.hasMany(Measurement);
	Measurement.belongsTo(Sensor);
};

module.exports = {
	seedMeasurementDataToDB,
	seedFarmDataToDB,
	seedSensorDataToDB,
	initTablesToDB,
	farms,
	sensors,
};
