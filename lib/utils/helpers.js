// * IMPORTS

// * FUNCTIONS

// ? function to return random item from an array
function random(items) {
  // ? use Math.random() to generate random # btwn 0-1
  // ? mutiply by length of array; use Math.floor() to round down to nearest integer
  return items[Math.floor(Math.random() * items.length)];
}



const repTime = function (exercise, expLevel, mult) {
		if (exercise == "Reps") {
			const Reps = Math.floor(1 * expLevel * mult)
			return `${Reps} Reps`
		}
		else {
			const Seconds = Math.floor(10 * expLevel * mult)
			return `${Seconds} Seconds`
		}
  }
// ** ES6V ** to return random item from an array
// const random = (items) => items[Math.floor(Math.random() * items.length)];

// ! Declare and initialize array of items

// ? Output the result of the random function with the array of items
// console.log(random(items));

// ? get multiple random elements from an array
// ? use the sort() method to shuffle the array
// ? use the slice() method on the shuffled array to get multiple random elements
// function multipleRandom(arr, num) {
//   const shuffled = [...arr].sort(() => 0.5 - Math.random());

//   return shuffled.slice(0, num);
// }

// // ! Declare array of items

// console.log(multipleRandom(arr, 1));

// * EXPORTS
module.exports = { random, repTime }