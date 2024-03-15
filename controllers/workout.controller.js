
const User = require("../models/user.model")
const Workout = require("../models/workout.model");
// const Exercise = require('../models/Exercise.model')
const random = require("../lib/utils/helpers")



// Creates Workout Based on Experience Level and Provides Reps/Sets
const createWorkout = async (req, res) => {
	// const user = req.user;
	// const foundUser = await User.findOne({ _id: user._id });
	// if (!foundUser) {
	// 	return req.status(400).json();
	// }
	
	const foundUser = {_id: 194872, experienceLevel: 7}


	const workout = await Workout.create({userId: foundUser._id})

	const workoutList = await workout.generateExercisesList(foundUser)

	await res.status(200).json({ success: true, data: {workoutList}})
}

	


// This Needs to Be Part One of Adding/Removing Experience Points
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

// Unnecessary Discuss then Possible Delete
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

module.exports = { createWorkout, completeWorkout };
