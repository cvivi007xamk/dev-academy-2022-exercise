const express = require("express");
const router = express.Router();

const {
	getFarm,
	getFarmById,
	createFarm,
	updateFarm,
	deleteFarm,
} = require("../controllers/farm-controller");

router.get("/farms", async (req, res) => {
	res.send(await getFarm());
});

router.get("/farms/:id", async (req, res) => {
	res.send(await getFarmById(req.params.id));
});

router.post("/farms", async (req, res) => {
	res.send(await createFarm());
});

router.put("/farms/:id", async (req, res) => {
	res.send(await updateFarm(req.params.id));
});

router.delete("/farms/:id", async (req, res) => {
	res.send(await deleteFarm(req.params.id));
});

module.exports = router;
