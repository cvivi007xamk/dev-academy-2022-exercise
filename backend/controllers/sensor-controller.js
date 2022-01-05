const { QueryTypes, Op } = require("sequelize");
const Sensor = require("../models/sensor-model");

const getSensors = async () => {
	await Sensor.sync();
	const allData = await Sensor.findAll();
	return allData;
};

const getSensorById = async (idNum) => {
	await Sensor.sync();
	const records = await Sensor.findAll({
		where: {
			id: idNum,
		},
	});
	return records;
};

const createSensor = async (rowObj) => {
	await Sensor.sync();
	await Sensor.create(rowObj);
};

const updateSensor = async (idNum, rowObj) => {
	await Sensor.sync();
	await Sensor.update(rowObj, {
		where: {
			id: idNum,
		},
	});
};

const deleteSensor = async (idNum) => {
	await Sensor.sync();
	await Sensor.destroy({
		where: {
			id: idNum,
		},
	});
};

module.exports = {
	getSensors,
	getSensorById,
	createSensor,
	updateSensor,
	deleteSensor,
};
