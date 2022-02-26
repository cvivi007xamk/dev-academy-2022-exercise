require("dotenv").config();
const { Sequelize } = require("sequelize");
// var connectionString = "postgres://userName:password@serverName/ip:port/nameOfDatabase";
// const db = new Sequelize(connectionString);
const db = new Sequelize(process.env.DATABASE_URL_LOCALHOST);
module.exports = db;
