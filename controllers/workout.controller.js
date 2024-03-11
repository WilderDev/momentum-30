const gainExp = require("../lib/utils/user-gain-exp");
const loseExp = require("../lib/utils/user-lose-exp");
const generateExercisesList = require("../lib/utils/generate-exercises-list");
const User = require("../models/user.model");
const Workout = require("../models/workout.model");

const startWorkout = async (req, res) => {
	const { user } = req.body;
	const foundUser = await User.findOne({ _id: user._id });
	if (!foundUser) {
		return req.status(400).json();
	}
	const exercises = generateExercisesList(user.exp);
	const workout = await Workout.create({
		userId: foundUser.id,
		exercises,
	});
	res.status(200).json({ success: true, data: { workout } });
};

const completeWorkout = async (req, res) => {
	const { user } = req.body;
	const foundUser = await User.findOne({ _id: user._id });
	if (!foundUser) {
		return req.status(400).json();
	}
	const { id: workoutId } = req.params;
	const foundWorkout = await Workout.findOne({ _id: workoutId });
	if (!foundWorkout) {
		return req.status(400).json();
	}
	if (!foundWorkout.userId === user.id) {
		return req.status(401).json();
	}
	gainExp(foundUser._id);
	res.status(200).json();
};

const stopWorkout = async (req, res) => {
	const { user } = req.body;
	const foundUser = await User.findOne({ _id: user._id });
	if (!foundUser) {
		return req.status(400).json();
	}
	const { id: workoutId } = req.params;
	loseExp(foundUser._id);
	res.status(200).json();
};

module.exports = { startWorkout, completeWorkout, stopWorkout };
