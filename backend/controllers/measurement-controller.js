const { Op } = require("sequelize");
const Farm = require("../models/farm-model");
const Sensor = require("../models/sensor-model");

const Measurement = require("../models/measurement-model");

const getMeasurements = async () => {
	await Measurement.sync();
	const results = await Measurement.findAll({ include: [Farm, Sensor] });
	return results;
};

const getFilteredMeasurements = async (filters) => {
	await Measurement.sync();
	console.log(filters);
	const results = await Measurement.findAll({
		include: [
			{
				model: Sensor,
				where: {
					SensorName: {
						[Op.or]: filters.sensors.split(","),
					},
				},
			},
			{
				model: Farm,
				where: {
					FarmName: {
						[Op.or]: filters.farms.split(","),
					},
				},
			},
		],
		where: {
			datetime: { [Op.between]: [filters.startDate, filters.endDate] },
		},
	});
	return results;
};

const getLatestMeasurements = async (numberOfRecords) => {
	await Measurement.sync();
	const latestRecords = await Measurement.findAll({
		include: [Farm, Sensor],
		order: [["datetime", "DESC"]],

		limit: numberOfRecords,
	});
	return latestRecords;
};

const getMeasurementsBetweenDates = async (starDate, endDate) => {
	await Measurement.sync();
	const records = await Measurement.findAll({
		where: {
			datetime: { [Op.between]: [starDate, endDate] },
		},
	});
	return records;
};

const getMeasurementById = async (idNum) => {
	await Measurement.sync();
	const records = await Measurement.findAll({
		where: {
			id: idNum,
		},
	});
	return records;
};

const createMeasurement = async (rowObj) => {
	await Measurement.sync();
	await Measurement.create(rowObj);
};

const updateMeasurement = async (idNum, rowObj) => {
	await Measurement.sync();
	await Measurement.update(rowObj, {
		where: {
			id: idNum,
		},
	});
};

const deleteMeasurement = async (idNum) => {
	await Measurement.sync();
	await Measurement.destroy({
		where: {
			id: idNum,
		},
	});
};

module.exports = {
	getFilteredMeasurements,
	getMeasurementsBetweenDates,
	getLatestMeasurements,
	createMeasurement,
	updateMeasurement,
	deleteMeasurement,
	getMeasurements,
	getMeasurementById,
};
