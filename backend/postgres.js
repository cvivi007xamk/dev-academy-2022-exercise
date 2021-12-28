require("dotenv").config();
const { Sequelize, QueryTypes, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL);

// const { Client } = require("pg");
// let client = new Client({
// 	connectionString: "postgresql://postgres:farm_data@localhost/postgres",
// });

const connectDB2 = async () => {
	try {
		console.log("Connect to Postgres ...");
		client.connect();
		await new Promise((resol, rej) => {
			client.query("Select now() as run_at;", (err, res) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					console.log(`Run at date-time : ${res.rows[0].run_at}`);
					resol(res.rows[0].run_at);
				}
			});
		});
		await client.end();
		console.log("Execution Completed ...");
	} catch (err) {
		console.log("Error while Connecting DB !");
	}
};

//connectDB();

const connectDB = async () => {
	try {
		await sequelize.authenticate();
		const ossi_farm = await sequelize.query("SELECT * FROM ossi_farm", {
			type: QueryTypes.SELECT,
		});
		//console.log(ossi_farm);
		sequelize.close();
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};

const createDB = (data) => {
	console.log("Creating Postgres table Farms");

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

	(async () => {
		await sequelize.sync({ force: true });
		// Code here
		await Farm.bulkCreate(data);
		console.log("Writing data to Farms table");
	})();
};

module.exports = { createDB, connectDB };
