const User = require("../models/user.model");
const userWorkout = require("../models/workout.model");
const Exercise = require('../models/exercise.model')
const random = require("../lib/utils/helpers")


// Unsure About This One
const startWorkout = async (req, res) => {
	const { user, numExercises } = req.body;
	const foundUser = await User.findOne({ _id: user._id });
	if (!foundUser) {
		return req.status(400).json();
	}
	const workout = await Workout.create({
		userId: foundUser.id,
	});
	workout.generateExerciseList(numExercises, foundUser);
	await workout.save();
	res.status(200).json({ success: true, data: { workout } });
};

// Creates Workout Based on Experience Level and Provides Reps/Sets
const createWorkout = async (req, res) => {
	// const {user} = req.body;
	// const foundUser = await User.findOne({ _id: user._id });
	// if (!foundUser) {
	// 	return req.status(400).json();
	// }
	// const expLevel = foundUser.experienceLevel
	function random(items) {
		
		return items[Math.floor(Math.random() * items.length)];
	  }
	  repTime = async function (exercise, expLevel, mult) {
		if (exercise == "Reps") {
			Reps = await Math.floor(1 * expLevel * mult)
			return `${Reps} Reps`
		}
		else {
			Seconds = await Math.floor(10 * expLevel * mult)
			return `${Seconds} Seconds`
		}
	}
	// Delete this expLevel when Experience is finished
	const expLevel = 24
	if (expLevel >= 0 && expLevel <= 10 ) {
		const upperExercise = await Exercise.find({ targetedArea: "Upper Body", challengeRating: "1"});
		const chosenUpper = random(upperExercise)
		const lowerExercise = await Exercise.find({ targetedArea: "Lower Body", challengeRating: "1"});
		const chosenLower = random(lowerExercise)
		const coreExercise = await Exercise.find({ targetedArea: "Core", challengeRating: "1"});
		const chosenCore = random(coreExercise)
		const plyoExercise = await Exercise.find({ targetedArea: "Plyometrics", challengeRating: "1"});
		const chosenPlyo = random(plyoExercise)

		const repTimeUp = await repTime(chosenUpper.workoutCountType, expLevel, 1)
		const repTimeLow = await repTime(chosenLower.workoutCountType, expLevel, 1)
		const repTimeCore = await repTime(chosenCore.workoutCountType, expLevel, 1)
		const repTimePlyo = await repTime(chosenPlyo.workoutCountType, expLevel, 1)

		const workoutList = [{chosenUpper}, repTimeUp, {chosenLower}, repTimeLow, {chosenCore}, repTimeCore, {chosenPlyo}, repTimePlyo]

		console.log(repTimeUp)
		return await res.status(200).json({ success: true, data: {workoutList}})
	}
	else if (expLevel >=11 && expLevel <=20) {
		const upperExercise = await Exercise.find({targetedArea: "Upper Body", challengeRating: ["1", "2"]})
		const chosenUpper = random(upperExercise)
		const lowerExercise = await Exercise.find({ targetedArea: "Lower Body", challengeRating: ["1", "2"]});
		const chosenLower = random(lowerExercise)
		const coreExercise = await Exercise.find({ targetedArea: "Core", challengeRating: ["1", "2"]});
		const chosenCore = random(coreExercise)
		const plyoExercise = await Exercise.find({ targetedArea: "Plyometrics", challengeRating: ["1", "2"]});
		const chosenPlyo = random(plyoExercise)

		const repTimeUp = await repTime(chosenUpper.workoutCountType, expLevel, .75)
		const repTimeLow = await repTime(chosenLower.workoutCountType, expLevel, .75)
		const repTimeCore = await repTime(chosenCore.workoutCountType, expLevel, .75)
		const repTimePlyo = await repTime(chosenPlyo.workoutCountType, expLevel, .75)

		const workoutList = [{chosenUpper}, repTimeUp, {chosenLower}, repTimeLow, {chosenCore}, repTimeCore, {chosenPlyo}, repTimePlyo, {chosenUpper}, repTimeUp, {chosenLower}, repTimeLow, {chosenCore}, repTimeCore, {chosenPlyo}, repTimePlyo]

		return await res.status(200).json({ success: true, data: {workoutList}})
	}
	else {
		const upperExercise = await Exercise.find({targetedArea: "Upper Body", challengeRating: ["1", "2", "3"]})
		const chosenUpper = random(upperExercise)
		const lowerExercise = await Exercise.find({ targetedArea: "Lower Body", challengeRating: ["1", "2", "3"]});
		const chosenLower = random(lowerExercise)
		const coreExercise = await Exercise.find({ targetedArea: "Core", challengeRating: ["1", "2", "3"]});
		const chosenCore = random(coreExercise)
		const plyoExercise = await Exercise.find({ targetedArea: "Plyometrics", challengeRating: ["1", "2", "3"]});
		const chosenPlyo = random(plyoExercise)

		const repTimeUp = await repTime(chosenUpper.workoutCountType, expLevel, .5)
		const repTimeLow = await repTime(chosenLower.workoutCountType, expLevel, .5)
		const repTimeCore = await repTime(chosenCore.workoutCountType, expLevel, .5)
		const repTimePlyo = await repTime(chosenPlyo.workoutCountType, expLevel, .5)

		const workoutList = [{chosenUpper}, repTimeUp, {chosenLower}, repTimeLow, {chosenCore}, repTimeCore, {chosenPlyo}, repTimePlyo, {chosenUpper}, repTimeUp, {chosenLower}, repTimeLow, {chosenCore}, repTimeCore, {chosenPlyo}, repTimePlyo, {chosenUpper}, repTimeUp, {chosenLower}, repTimeLow, {chosenCore}, repTimeCore, {chosenPlyo}, repTimePlyo]

		return  await res.status(200).json({ success: true, data: {workoutList}})
	}

	
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

module.exports = { startWorkout, completeWorkout, stopWorkout, createWorkout };
