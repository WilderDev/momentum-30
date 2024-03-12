const router = require("express").Router();
const {
	startWorkout,
	completeWorkout,
	stopWorkout,
} = require("../controllers/workout.controller");

router.get("/today", startWorkout);
router.post("/complete/:id", completeWorkout);
router.post("/failed/:id", stopWorkout);

module.exports = router;
