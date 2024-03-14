const {mongoose, Types} = require("mongoose");
const Exercise = require("./exercise.model");
const random = require('../lib/utils/helpers');


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

module.exports = mongoose.model("UserWorkout", UserWorkoutSchema);
