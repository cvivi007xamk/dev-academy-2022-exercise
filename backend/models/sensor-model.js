const { DataTypes } = require("sequelize");
const db = require("../config/db-config.js");

const Sensor = db.define(
	"Sensor",
	{
		// Model attributes are defined here

		sensorType: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		// Other model options go here
	}
);

module.exports = Sensor;
