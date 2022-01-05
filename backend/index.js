const express = require("express");
const app = express();
const seedData = require("./config/db-seed");
const cors = require("cors");
const farmRouter = require("./routes/farm-routes");
const measurementRouter = require("./routes/measurement-routes");
const sensorRouter = require("./routes/sensor-routes");

var corsOptions = {
	origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(farmRouter);
app.use(measurementRouter);
app.use(sensorRouter);

const PORT = 3001;
//app.listen(PORT);
app.listen(PORT, function (err) {
	if (err) console.log("Error in server setup");
	seedData();
});
console.log(`Server running on port ${PORT}`);
