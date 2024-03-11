const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
	{
		name: {
			type: String,
		},
		videoURL: {
			type: String,
		},
		targetedArea: {
			type: String,
		},
		challengeRating: {
			type: String,
			enum: ["1", "2", "3"],
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
