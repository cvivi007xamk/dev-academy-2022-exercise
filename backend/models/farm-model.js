const { DataTypes } = require("sequelize");
const db = require("../config/db-config.js");
const Farm = db.define(
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

module.exports = Farm;
