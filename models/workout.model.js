const {mongoose, Types} = require("mongoose");
const Exercise = require("./Exercise.model");
const random = require('../lib/utils/helpers');

const mongoose = require("mongoose");
const Exercise = require("./Exercise.model");
const User = requir("./user.model.js");

const UserWorkoutSchema = new mongoose.Schema(
	{
		userID: {
			type: Types.ObjectId,
			ref: 'User'
		},
		exercises: {
			type: Array,
		},
		completedOn: {
			type: Date,
		},
		success: {
			type: Boolean,
		},
		workoutExp: {
			type: Number,
		},
	},
	{ timestamps: true }
);

// UserWorkoutSchema.methods.generateExercisesList = async function (
// 	numExercises
// ) {
// 	//TODO set difficulty
// 	this.exercises = [];
// 	const usedIndexes = new Set();
// 	const allExercises = await Exercise.find({});
// 	while (this.exercises < numExercises) {
// 		const randNum = Math.floor(Math.random() * allExercises.length);
// 		if (usedIndexes.has(randNum)) {
// 			const exerciseReps = {
// 				exercise: allExercises.slice[randNum],
// 				numReps: 5,
// 			};
// 			this.exercises.push(exerciseReps);
// 			usedIndexes.add(randNum);
// 		}
// 	}
// 	this.workoutExp = this.exercises.reduce(
// 		(acc, exerciseReps) =>
// 			acc + exerciseReps.exercise.experience * exerciseReps.reps
// 	);
// };


// UserWorkoutSchema.methods.repTime = async function (exercise, expLevel, mult) {
// 	if (exercise.workoutCountType === "Reps") {
// 		Reps = 1 * expLevel * mult
// 		return `${{Reps}} Reps`
// 	}
// 	else {
// 		Seconds = 10 * expLevel * mult
// 		return `${{Seconds}} Seconds`
// 	}
// }

// UserWorkoutSchema.methods.completeWorkout = function () {
// 	this.success = true;
// 	this.completedOn = new Date(Date.now());
// 	return workoutExp;
// };

// UserWorkoutSchema.methods.endWorkoutEarly = function () {
// 	this.success = false;
// 	this.completedOn = new Date(Date.now());
// 	return workoutExp * -0;
// };




UserWorkoutSchema.methods.generateExercisesList = async function (
	numExercises,
	user
) {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const lastWorkout = user.lastWorkout;
	lastWorkout.setHours(0, 0, 0, 0);
	this.exercises = [];


	
	const usedIndexes = new Set();
	const usedTargetedAreas = new Set();
	const allExercises = await Exercise.find({});
	if (today > lastWorkout) {
		while (this.exercises < numExercises) {
			const randNum = Math.floor(Math.random() * allExercises.length);
			if (!usedIndexes.has(randNum)) {
				if (!usedTargetedAreas.has(allExercises[randNum].targetedArea)) {
					if (user.experience <= 10) {
						if (allExercises[randNum].challengeRating === 1) {
							this.exercises.push(allExercises[randNum]);
						}
					} else if (user.experience > 10 && user.experience <= 20) {
						if (
							allExercises[randNum].challengeRating === 1 &&
							allExercises[randNum].challengeRating === 2
						) {
							this.exercises.push(allExercises[randNum]);
						}
					} else {
						if (
							allExercises[randNum].challengeRating === 1 &&
							allExercises[randNum].challengeRating === 2 &&
							allExercises[randNum].challengeRating === 3
						) {
							this.exercises.push(allExercises[randNum]);
						}
					}

					usedTargetedAreas.add(this.allExercises[randNum].targetedArea);
				}
				usedIndexes.add(randNum);
			}
		}
		this.workoutExp = this.exercises.reduce(
			(acc, exerciseReps) =>
				acc + exerciseReps.exercise.experience * exerciseReps.reps
		);
	}

	UserWorkoutSchema.methods.completeWorkout = async function () {
		this.success = true;
		this.completedOn = new Date(Date.now());
		const user = await User.findOne({ _id: this.userID });
		if (!user) {
			return;
		}
		user.lastWorkout = this.completedOn;
		user.save();

		return this.workoutExp;
	};

	UserWorkoutSchema.methods.endWorkoutEarly = async function () {
		this.success = false;
		this.completedOn = new Date(Date.now());
		const user = await User.findOne({ _id: this.userID });
		if (!user) {
			return;
		}
		user.lastWorkout = this.completedOn;
		user.save();

		return this.workoutExp * -0.5;
	};
};

module.exports = mongoose.model("UserWorkout", UserWorkoutSchema);
