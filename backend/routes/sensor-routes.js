const express = require("express");
const router = express.Router();

const {
	getSensors,
	getSensorById,
	createSensor,
	updateSensor,
	deleteSensor,
} = require("../controllers/sensor-controller");

router.get("/sensors", async (req, res) => {
	res.send(await getSensors());
});

router.get("/sensors/:id", async (req, res) => {
	res.send(await getSensorById(req.params.id));
});

router.post("/sensors", async (req, res) => {
	res.send(await createSensor());
});

router.put("/sensors/:id", async (req, res) => {
	res.send(await updateSensor(req.params.id));
});

router.delete("/sensors/:id", async (req, res) => {
	res.send(await deleteSensor(req.params.id));
});

module.exports = router;
