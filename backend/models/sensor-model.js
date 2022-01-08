const { DataTypes } = require("sequelize");
const db = require("../config/db-config.js");

const Sensor = db.define(
	"Sensor",
	{
		SensorName: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
	},
	{}
);

module.exports = Sensor;
