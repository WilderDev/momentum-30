const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
	{
		name: {
			type: String,
		},
		targetedArea: {
			type: String,
			enum: ["Upper Body", "Lower Body", "Core", "Plyometrics"]
		},
		workoutCountType: {
			type: String,
			enum: ["Reps", "Time"]
		},
		challengeRating: {
			type: String,
			enum: ["1", "2", "3"],
		},
		regularVariation: {
			name: {type: String},
			videoURL: {type: String}
		},
		easyVariation: {
			name: {
				type: String,
			},
			videoURL: {
				type: String,
			},
		},
		hardVariation: {
			name: {
				type: String,
			},
			videoURL: {
				type: String,
			},
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Exercise", exerciseSchema);
