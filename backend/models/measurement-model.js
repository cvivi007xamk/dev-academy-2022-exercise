const { DataTypes } = require("sequelize");
const db = require("../config/db-config.js");

const Measurement = db.define(
	"Measurement",
	{
		// Model attributes are defined here
		FarmId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		datetime: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		SensorId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		value: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
	},
	{
		// Other model options go here

		validate: {
			checkSensorValueRange() {
				if (
					this.SensorId === 1 &&
					(this.value < -50 || this.value > 100)
				) {
					throw new Error(
						"Temperature must be a value between -50 and 100"
					);
				}
				if (
					this.SensorId === 2 &&
					(this.value < 0 || this.value > 500)
				) {
					throw new Error(
						"Rainfall must be a value between 0 and 500"
					);
				}
				if (
					this.SensorId === 3 &&
					(this.value < 0 || this.value > 14)
				) {
					throw new Error("pH must be a value between 0 and 14");
				}
			},
		},
	}
);

module.exports = Measurement;
