const mongoose = require("mongoose");

const userWorkoutSchema = new mongoose.Schema(
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
	},
	{ timestamps: true }
);

module.exports = mongoose.model("UserWorkout", userWorkoutSchema);
