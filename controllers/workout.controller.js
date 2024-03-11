const User = require("../models/user.model");
const Workout = require("../models/workout.model");

const startWorkout = async (req, res) => {
	const { user, numExercises } = req.body;
	const foundUser = await User.findOne({ _id: user._id });
	if (!foundUser) {
		return req.status(400).json();
	}
	const workout = await Workout.create({
		userId: foundUser.id,
	});
	workout.generateExerciseList(numExercises);
	await workout.save();
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
	const exp = foundWorkout.completeWorkout();
	foundUser.gainExp(exp);
	await foundWorkout.save();
	await foundUser.save();
	res.status(200).json();
};

const stopWorkout = async (req, res) => {
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
	const exp = foundWorkout.endWorkoutEarly();
	foundUser.loseExp(exp);
	await foundWorkout.save();
	await foundUser.save();
	res.status(200).json();
};

module.exports = { startWorkout, completeWorkout, stopWorkout };
