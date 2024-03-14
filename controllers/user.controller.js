const User = require("../models/user.model");

// const levelUp = async (req, res) => {
//     const {user} = req.body;
// 	const foundUser = await User.findOneandUpdate({ _id: user._id,  });
// 	if (!foundUser) {
// 		return req.status(400).json();
// 	}
//     const nextLevel = foundUser.experienceLevel
    
//     nextLevel = nextLevel + 1

//     return nextLevel

//     await User.findOneAndUpdate({})
// }

module.exports = { levelUp, levelDown }