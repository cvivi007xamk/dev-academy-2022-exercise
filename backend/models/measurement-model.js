const { DataTypes } = require("sequelize");
const db = require("../config/db-config.js");

const Measurement = db.define(
	"Measurement",
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

module.exports = Measurement;
