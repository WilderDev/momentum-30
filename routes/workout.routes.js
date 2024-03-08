const router = require("express").Router();
const {
	startWorkout,
	completeWorkout,
	failedWorkout,
} = require("../controllers/workout.controller");

router.get("/start", startWorkout);
router.post("/complete/:id", completeWorkout);
router.post("/failed/:id", failedWorkout);

module.exports = router;
