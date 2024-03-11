const mongoose = require("mongoose");
const Exercise = require("./exercise.model");

const UserWorkoutSchema = new mongoose.Schema(
	{
		userID: {
			type: String,
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

UserWorkoutSchema.methods.generateExercisesList = async function (
	numExercises
) {
	//TODO set difficulty
	this.exercises = [];
	const usedIndexes = new Set();
	const allExercises = await Exercise.find({});
	while (this.exercises < numExercises) {
		const randNum = Math.floor(Math.random() * allExercises.length);
		if (usedIndexes.has(randNum)) {
			const exerciseReps = {
				exercise: allExercises.slice[randNum],
				numReps: 5,
			};
			this.exercises.push(exerciseReps);
			usedIndexes.add(randNum);
		}
	}
	this.workoutExp = this.exercises.reduce(
		(acc, exerciseReps) =>
			acc + exerciseReps.exercise.experience * exerciseReps.reps
	);
};

UserWorkoutSchema.methods.completeWorkout = function () {
	this.success = true;
	this.completedOn = new Date(Date.now());
	return workoutExp;
};

UserWorkoutSchema.methods.endWorkoutEarly = function () {
	this.success = false;
	this.completedOn = new Date(Date.now());
	return workoutExp * -0;
};

module.exports = mongoose.model("UserWorkout", UserWorkoutSchema);
