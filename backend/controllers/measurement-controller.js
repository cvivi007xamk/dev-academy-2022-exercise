const { QueryTypes, Op } = require("sequelize");
const Measurement = require("../models/measurement-model");

const getMeasurements = async () => {
	await Measurement.sync();
	const results = await Measurement.findAll();
	return results;
};

const getFilteredMeasurements = async (filters) => {
	await Measurement.sync();
	const results = await Measurement.findAll({
		where: {
			datetime: { [Op.between]: [filters.starDate, filters.endDate] },
			sensorType: {
				[Op.or]: filters.sensors.split(","),
			},
			location: {
				[Op.or]: filters.farms.split(","),
			},
			id: filters.id,
		},
	});
	return results;
};

const getLatestMeasurements = async (numberOfRecords) => {
	await Measurement.sync();
	const latestRecords = await Measurement.findAll({
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
};

// const connectDB = async () => {
// 	try {
// 		await sequelize.authenticate();
// 		const ossi_farm = await sequelize.query("SELECT * FROM ossi_farm", {
// 			type: QueryTypes.SELECT,
// 		});
// 		sequelize.close();
// 	} catch (error) {
// 		console.error("Unable to connect to the database:", error);
// 	}
// };

// const getFilteredData = async (farmsArray, sensorsArray, starDate, endDate) => {
// 	await Farm.sync();
// 	const records = await Farm.findAll({
// 		where: {
// 			datetime: { [Op.between]: [starDate, endDate] },
// 			sensorType: {
// 				[Op.or]: sensorsArray.split(","),
// 			},
// 			location: {
// 				[Op.or]: farmsArray.split(","),
// 			},
// 		},
// 	});
// 	return records;
// };
