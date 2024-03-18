const router = require("express").Router();
const {
	startWorkout,
	completeWorkout,
	createWorkout,
} = require("../controllers/workout.controller");

router.get("/start", startWorkout);
router.post("/complete/:id", completeWorkout);
//! router.post("/failed/:id", stopWorkout);
router.get("/current", createWorkout);
router.post("/levelup", leveUp);
router.post("/leveldown", levelDown);

module.exports = router;
