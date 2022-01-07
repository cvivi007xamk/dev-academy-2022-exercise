const express = require("express");
const router = express.Router();

const {
	getFilteredMeasurements,
	getMeasurementsBetweenDates,
	getLatestMeasurements,
	createMeasurement,
	updateMeasurement,
	deleteMeasurement,
	getMeasurements,
} = require("../controllers/measurement-controller");

const numberOfLatestMeasurements = 10;

// // Endpoints to fetch data from farms with different granularities (by month, by metric)
// // Aggregate calculation endpoints, endpoint which returns monthly averages, min/max and other statistical analysis

router.get("/", async (req, res) => {
	res.send("Hello world!");
});

router.get("/measurements", async (req, res) => {
	const filters = req.query;
	res.send(await getMeasurements());
});

router.get("/measurements", async (req, res) => {
	const filters = req.query;
	res.send(await getFilteredMeasurements(filters));
});

router.get("/measurements/latest/:num", async (req, res) => {
	res.send(await getLatestMeasurements(req.params.num));
});

router.get("/measurements/:startDate/:endDate", async (req, res) => {
	res.send(
		await getMeasurementsBetweenDates(
			req.params.startDate,
			req.params.endDate
		)
	);
});

router.post("/measurements", async (req, res) => {
	try {
		const body = req.body;
		if (!body.content) {
			return res.status(400).json({
				error: "Request body content missing.",
			});
		}
		await createMeasurement(body.content);
		res.json(body.content);
	} catch (error) {
		res.end(error.message || e.toString());
	}
});

router.put("/measurements/:id", async (req, res) => {
	try {
		const body = req.body;
		if (!body.content) {
			return res.status(400).json({
				error: "Request body content missing.",
			});
		}
		await updateMeasurement(req.params.id, body.content);
		res.json(body.content);
	} catch (error) {
		res.end(error.message || e.toString());
	}
});

router.delete("/measurements/:id", async (req, res) => {
	try {
		await deleteMeasurement(req.params.id);
		res.json(body.content);
	} catch (error) {
		res.end(error.message || e.toString());
	}
});

module.exports = router;
