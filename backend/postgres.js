require("dotenv").config();
const { Sequelize, QueryTypes, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL);

const Farm = sequelize.define(
	"Farm",
	{
		// Model attributes are defined here
		location: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		datetime: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		sensorType: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		value: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
	},
	{
		// Other model options go here
	}
);

const writeDataToDB = async (data) => {
	console.log("Creating Postgres table Farms");
	await sequelize.sync({ force: true });
	await Farm.bulkCreate(data);
	console.log("Writing data to Farms table");
};

module.exports = {
	writeDataToDB,
};
