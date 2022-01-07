const { DataTypes } = require("sequelize");
const db = require("../config/db-config.js");

const Sensor = db.define(
	"Sensor",
	{
		// Model attributes are defined here

		SensorName: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
	},
	{
		// Other model options go here
	}
);

module.exports = Sensor;
