const router = require("express").Router();
const {
	startWorkout,
	completeWorkout,
	stopWorkout,
	createWorkout

} = require("../controllers/workout.controller");

router.get("/start", startWorkout);
router.post("/complete/:id", completeWorkout);
router.post("/failed/:id", stopWorkout);
router.get("/current", createWorkout)

module.exports = router;
