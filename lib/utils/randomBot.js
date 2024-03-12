// * IMPORTS * //

// * FUNCTIONS * //
// Generate a Random Bot
const randomBotGen = () => {
  // Genrate Random Names
  function generateRandomName(firstNames) {
    const randomFirstName =
      firstNames[Math.floor(Math.random() * firstNames.length)]
    return `${randomFirstName}`
  }

  // Generate Random Gender
  randomGender = () => {
    let gender = Math.floor(Math.random() * 2)
    if (gender === 0) {
      return 'male'
    } else {
      return 'female'
    }
  }

  // Give a random age from age 18-60
  randomAge = () => {
    let age = Math.floor(Math.random() * 50) + 18
    return age
  }

  // give a random picture
  randomPicture = (pictures) => {
    const randomPicture = pictures[Math.floor(Math.random() * pictures.length)]
    return `${randomPicture}`
  }

  // random streak
  randomStreak = () => {
    let streak = Math.floor(Math.random() * 5) + 1
    return streak
  }

  // random personality
  randomPersonality = () => {
    const personalities = [
      'Energetic',
      'Joyful',
      'Stressed',
      'Calm',
      'Hyped',
      'Melancholic',
      'Adventurous',
      'Laid-back',
      'Confident',
      'Playful',
    ]

    const randomIndex = Math.floor(Math.random() * personalities.length)
    return personalities[randomIndex]
  }

  // Gender equals the random gender
  const gender = randomGender()

  // names defaults to empty array
  let names = []
  let pictures = []

  // Give names based on gender
  if (gender === 'male') {
    names = [
      'James',
      'John',
      'Robert',
      'Michael',
      'William',
      'David',
      'Richard',
      'Joseph',
      'Charles',
      'Thomas',
      'Christopher',
      'Daniel',
      'Matthew',
      'Anthony',
      'Donald',
      'Mark',
      'Paul',
      'Steven',
      'Andrew',
      'Brian',
    ]
    pictures = [
      'https://cdn-icons-png.flaticon.com/128/4874/4874944.png',
      'https://cdn-icons-png.flaticon.com/128/9416/9416202.png',
      'https://cdn-icons-png.flaticon.com/128/9408/9408175.png',
      'https://cdn-icons-png.flaticon.com/128/8398/8398295.png',
      'https://cdn-icons-png.flaticon.com/128/11748/11748243.png',
      'https://cdn-icons-png.flaticon.com/128/9194/9194480.png',
    ]
  } else if (gender === 'female') {
    names = [
      'Mary',
      'Patricia',
      'Jennifer',
      'Linda',
      'Elizabeth',
      'Barbara',
      'Susan',
      'Jessica',
      'Sarah',
      'Karen',
      'Nancy',
      'Lisa',
      'Margaret',
      'Betty',
      'Dorothy',
      'Emily',
      'Helen',
      'Grace',
      'Sophia',
      'Olivia',
    ]
    pictures = [
      'https://cdn-icons-png.flaticon.com/128/8398/8398238.png',
      'https://cdn-icons-png.flaticon.com/128/8398/8398210.png',
      'https://cdn-icons-png.flaticon.com/128/8398/8398170.png',
      'https://cdn-icons-png.flaticon.com/128/8398/8398300.png',
      'https://cdn-icons-png.flaticon.com/128/8398/8398268.png',
      'https://cdn-icons-png.flaticon.com/128/8398/8398243.png',
      'https://cdn-icons-png.flaticon.com/128/8398/8398263.png',
      'https://cdn-icons-png.flaticon.com/128/8398/8398288.png',
    ]
  }

  // Return the person
  return {
    name: generateRandomName(names),
    age: randomAge(),
    gender: gender,
    pic: randomPicture(pictures),
    personality: randomPersonality(),
    streak: randomStreak(),
  }
}


// * EXPORTS * //
module.exports = randomBotGen
