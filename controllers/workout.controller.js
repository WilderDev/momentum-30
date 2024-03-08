const gainExp = require("../lib/utils/user-gain-exp");
const loseExp = require("../lib/utils/user-lose-exp");

const startWorkout = (req, res) => {
	//generate workout
	//send workout to user
};

const completeWorkout = (req, res) => {
	const { exp } = req.body;
	const { id } = req.params;
	const user = User.findOne({ id }); //find user with id that matches

	generateWorkout(); //add workout to user's history
	//reward user for completing workout
	gainExp();
};

const failedWorkout = (req, res) => {
	const { exp } = req.body;
	const { id } = req.params;
	const user = User.findOne({ id });
	loseExp();
};

module.exports = { startWorkout, completeWorkout, failedWorkout };
