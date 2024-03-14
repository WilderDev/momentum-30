// IMPORTS
const { attachCookiesToResponse } = require("../lib/utils/cookie");
const User = require("../models/user.model");

// * FUNCTIONS * //
// FIRST VISIT DEFAULT TO UNVISITED
const firstVisit = false;
// CHECKS FOR USER AND COOKIES TO SEE IF APP HAS BEEN VISITED
const checkFirstVisit = async (req, res) => {
	const { user } = req.body;
	const foundUser = await User.findOne({ _id: user._id });
	const foundCookie = await attachCookiesToResponse.findOne();
	if (!foundCookie || !foundUser) {
		// IF NO USER OR COOKIE FOUND SET FIRST VISIT TO TRUE
		return (firstVisit = true);
	}
};

checkFirstVisit();

// EXPORTS
module.exports = { firstVisit };
