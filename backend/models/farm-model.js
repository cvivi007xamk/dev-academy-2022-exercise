const { DataTypes } = require("sequelize");
const db = require("../config/db-config.js");
const Farm = db.define(
	"Farm",
	{
		FarmName: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		Latitude: {
			type: DataTypes.FLOAT,
			allowNull: true,
			defaultValue: null,
			validate: {
				min: -90,
				max: 90,
			},
		},
		Longitude: {
			type: DataTypes.FLOAT,
			allowNull: true,
			defaultValue: null,
			validate: {
				min: -180,
				max: 180,
			},
		},
	},
	{}
);

module.exports = Farm;
