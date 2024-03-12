// * IMPORTS
const { model, Schema } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// * SCHEMA
const UserSchema = new Schema({
	username: {
		type: String,
		required: [true, "Please provide a username"],
		minlength: 3,
		maxlength: 50,
	},
	email: {
		type: String,
		required: [true, "Please provide an email"],
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			"Please fill a valid email address",
		],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Please provide a password"],
		minlength: 6,
	},
	role: {
		type: String,
		enum: ["free", "user", "admin"],
		default: "user",
	},
	verificationToken: String,
	isVerified: {
		type: Boolean,
		default: false,
	},
	verified: Date,
	passwordToken: {
		type: String,
	},
	passwordTokenExpireDate: {
		type: Date,
	},
	streak: {
		type: Number,
		default: 0,
	},
	experience: {
		type: Number,
		default: 1,
		min: 1,
		max: 30,
	},
	lastWorkout: {
		type: Date,
	},
});

// Presave Password Hashing
UserSchema.pre("save", async function () {
	if (!this.isModified("password")) return;

	const salt = await bcrypt.genSalt(10);

	this.password = await bcrypt.hash(this.password, salt);
});

// Generate JWT With Schema Methods
UserSchema.methods.createToken = function () {
	return jwt.sign(
		{ userId: this._id, name: this.name, role: this.role },
		process.env.JWT_SECRET,
		{
			expiresIn: "1d",
		}
	);
};

// Compare incoming password to hashed password for validity
UserSchema.methods.comparePassword = async function (incomingPassword) {
	const isMatch = await bcrypt.compare(incomingPassword, this.password);
	return isMatch;
};

UserSchema.methods.gainExp = function (exp) {
	this.experienceLevel += exp;
};

UserSchema.methods.loseExp = function (exp) {
	this.experienceLevel -= exp;
};

UserSchema.methods.checkStreak = function () {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);
	const checkdate = new Date(lastWorkout);
	checkdate.setHours(0, 0, 0, 0);
	if (checkdate.getTime() === yesterday.getTime()) {
		streak++;
	} else {
		streak = 0;
	}
};

// * EXPORTS
module.exports = model("User", UserSchema);
