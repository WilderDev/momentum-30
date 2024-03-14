const User = require("../../models/User.model");
const Workout = require("../..models/Workout.model");
const { successfulRes, unsuccessfulRes } = require("../lib/utils/response");

const startWorkout = async (req, res) => {
	const { numExercises } = req.body;
	const user = req.user;
	const foundUser = await User.findOne({ _id: user._id });
	if (!foundUser) {
		return unsuccessfulRes({ res, _, data: { message: "no user found" } });
	}
	const workout = await Workout.create({
		userId: foundUser.id,
	});
	workout.generateExerciseList(numExercises, foundUser);
	await workout.save();
	return successfulRes({ res, _, workout });
};

const completeWorkout = async (req, res) => {
	const user = req.user;
	const foundUser = await User.findOne({ _id: user._id });
	if (!foundUser) {
		return unsuccessfulRes({ res, _, data: { message: "no user found" } });
	}
	const { id: workoutId } = req.params;
	const foundWorkout = await Workout.findOne({ _id: workoutId });
	if (!foundWorkout) {
		return unsuccessfulRes({
			res,
			_,
			data: { message: "no workout found with workout id provided" },
		});
	}
	if (!foundWorkout.userId === user.id) {
		return unsuccessfulRes({
			res,
			_,
			data: { message: "no workout with user id provided" },
		});
	}
	const exp = foundWorkout.completeWorkout();
	foundUser.gainExp(exp);
	await foundWorkout.save();
	await foundUser.save();
	return successfulRes({ res, _, workout });
};

const stopWorkout = async (req, res) => {
	const user = req.user;
	const foundUser = await User.findOne({ _id: user._id });
	if (!foundUser) {
		return unsuccessfulRes({ res, _, data: { message: "no user found" } });
	}
	const { id: workoutId } = req.params;
	const foundWorkout = await Workout.findOne({ _id: workoutId });
	if (!foundWorkout) {
		return unsuccessfulRes({
			res,
			_,
			data: { message: "no workout with workout id provided" },
		});
	}
	if (!foundWorkout.userId === user.id) {
		return unsuccessfulRes({
			res,
			_,
			data: { message: "no workout with user id provided" },
		});
	}
	const exp = foundWorkout.endWorkoutEarly();
	foundUser.loseExp(exp);
	await foundWorkout.save();
	await foundUser.save();
	return successfulRes();
};

module.exports = { startWorkout, completeWorkout, stopWorkout };
