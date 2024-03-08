// * IMPORTS * //
const { mongoose, Types } = require('mongoose')
const Schema = mongoose.Schema

// * MODEL * //
const botModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    max: 70,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  personality: {
    type: String,
    enum: [
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
    ],
    required: true,
  },
  user: {
    type: Types.ObjectId,
    ref: 'User',
    // ! TURN BACK ON ONCE GET USER MODEL
    // required: true,
  },
})

// * EXPORTS * //
module.exports = mongoose.model('Bot', botModel)
