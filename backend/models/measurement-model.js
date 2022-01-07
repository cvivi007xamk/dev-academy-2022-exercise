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
		Datetime: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		SensorId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		Value: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
	},
	{
		// Other model options go here

		validate: {
			sensorValues() {
				if (
					this.SensorId === 1 &&
					(this.Value < -50 || this.Value > 100)
				) {
					throw new Error(
						"Temperature must be a value between -50 and 100"
					);
				}
				if (
					this.SensorId === 2 &&
					(this.Value < 0 || this.Value > 500)
				) {
					throw new Error(
						"Rainfall must be a value between 0 and 500"
					);
				}
				if (
					this.SensorId === 3 &&
					(this.Value < 0 || this.Value > 14)
				) {
					throw new Error("pH must be a value between 0 and 14");
				}
			},
		},
	}
);

module.exports = Measurement;
