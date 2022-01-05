const { QueryTypes, Op } = require("sequelize");
const Farm = require("../models/farm-model");

const getFarm = async () => {
	await Farm.sync();
	const allData = await Farm.findAll();
	return allData;
};

const getFarmById = async (idNum) => {
	await Farm.sync();
	const records = await Farm.findAll({
		where: {
			id: idNum,
		},
	});
	return records;
};

const createFarm = async (rowObj) => {
	await Farm.sync();
	await Farm.create(rowObj);
};

const updateFarm = async (idNum, rowObj) => {
	await Farm.sync();
	await Farm.update(rowObj, {
		where: {
			id: idNum,
		},
	});
};

const deleteFarm = async (idNum) => {
	await Farm.sync();
	await Farm.destroy({
		where: {
			id: idNum,
		},
	});
};

module.exports = {
	getFarm,
	getFarmById,
	createFarm,
	updateFarm,
	deleteFarm,
};
