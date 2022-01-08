const db = require("../config/db-config.js");
const Farm = require("../models/farm-model");
const Sensor = require("../models/sensor-model");
const Measurement = require("../models/measurement-model");

let farms = [
	{ FarmName: "Friman Metsola collective" },
	{ FarmName: "Noora's farm" },
	{ FarmName: "Organic Ossi's Impact That Lasts plantase" },
	{ FarmName: "PartialTech Research Farm" },
];

let sensors = [
	{ SensorName: "pH" },
	{ SensorName: "rainFall" },
	{ SensorName: "temperature" },
];
const seedMeasurementDataToDB = async (data) => {
	await Measurement.sync({ force: true });
	await Measurement.bulkCreate(data);
};

const seedFarmDataToDB = async (data) => {
	await Farm.sync({ force: true });
	await Farm.bulkCreate(data);
};

const seedSensorDataToDB = async (data) => {
	await Sensor.sync({ force: true });
	await Sensor.bulkCreate(data);
};

const initRelationsToDB = async () => {
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
	initRelationsToDB,
	farms,
	sensors,
};
