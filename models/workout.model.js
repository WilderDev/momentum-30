const {mongoose, Types} = require("mongoose");
const Exercise = require("./Exercise.model");
const {random, repTime} = require('../lib/utils/helpers');
const User = require("./user.model");

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



UserWorkoutSchema.methods.generateExercisesList = async function (
	user
) {
	// const today = new Date();
	// today.setHours(0, 0, 0, 0);
	// const lastWorkout = user.lastWorkout;
	// lastWorkout.setHours(0, 0, 0, 0);
	const expLevel = user.experienceLevel
	this.exercises = [];


	if (expLevel >= 0 && expLevel <= 10 ) {
		const upperExercise = await Exercise.find({ targetedArea: "Upper Body", challengeRating: "1"});
		const chosenUpper = random(upperExercise)
		const lowerExercise = await Exercise.find({ targetedArea: "Lower Body", challengeRating: "1"});
		const chosenLower = random(lowerExercise)
		const coreExercise = await Exercise.find({ targetedArea: "Core", challengeRating: "1"});
		const chosenCore = random(coreExercise)
		const plyoExercise = await Exercise.find({ targetedArea: "Plyometrics", challengeRating: "1"});
		const chosenPlyo = random(plyoExercise)


		const repTimeUp =  repTime(chosenUpper.workoutCountType, expLevel, 1)
		const repTimeLow = repTime(chosenLower.workoutCountType, expLevel, 1)
		const repTimeCore = repTime(chosenCore.workoutCountType, expLevel, 1)
		const repTimePlyo = repTime(chosenPlyo.workoutCountType, expLevel, 1)

		const workoutList = [{exercise: chosenUpper, rep: repTimeUp}, {exercise: chosenLower, rep: repTimeLow}, {exercise: chosenCore, rep: repTimeCore}, {exercise: chosenPlyo, rep: repTimePlyo}]

		return workoutList
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

		const workoutList = [{exercise: chosenUpper, rep: repTimeUp}, {exercise: chosenLower, rep: repTimeLow}, {exercise: chosenCore, rep: repTimeCore}, {exercise: chosenPlyo, rep: repTimePlyo}, {exercise: chosenUpper, rep: repTimeUp}, {exercise: chosenLower, rep: repTimeLow}, {exercise: chosenCore, rep: repTimeCore}, {exercise: chosenPlyo, rep: repTimePlyo}]
		return workoutList
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

		const workoutList = [{exercise: chosenUpper, rep: repTimeUp}, {exercise: chosenLower, rep: repTimeLow}, {exercise: chosenCore, rep: repTimeCore}, {exercise: chosenPlyo, rep: repTimePlyo}, {exercise: chosenUpper, rep: repTimeUp}, {exercise: chosenLower, rep: repTimeLow}, {exercise: chosenCore, rep: repTimeCore}, {exercise: chosenPlyo, rep: repTimePlyo}, {exercise: chosenUpper, rep: repTimeUp}, {exercise: chosenLower, rep: repTimeLow}, {exercise: chosenCore, rep: repTimeCore}, {exercise: chosenPlyo, rep: repTimePlyo}]

		return workoutList
	}
};

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

module.exports = mongoose.model("UserWorkout", UserWorkoutSchema);
