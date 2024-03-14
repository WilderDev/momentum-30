const router = require("express").Router();
const {
	startWorkout,
	completeWorkout,
	stopWorkout,
	createWorkout

} = require("../controllers/workout.controller");

router.get("/start", startWorkout);
router.post("/complete/:id", completeWorkout);
<<<<<<< HEAD
router.post("/cancel/:id", stopWorkout);
=======
router.post("/failed/:id", stopWorkout);
router.get("/current", createWorkout);
router.post("/levelup", leveUp);
router.post("/leveldown", levelDown);
>>>>>>> origin/staging

module.exports = router;
