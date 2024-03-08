const {mongoose, Types} = require('mongoose')



const userSchema = new mongoose.Schema( { 
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        minlength: 3,
        maxlength: 50,
      },
      email: {
        type: String,
        required: [true, 'Please provide an email'],
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please fill a valid email address',
        ],
        unique: true,
      },
      password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6,
      },
      streak: {
        type: Number
      },
      experienceLevel: {
        type: Number,
      },
      currentTier: {
        type: String,
        enum: ['1', '2', '3']
      },
      teamGroup: [{
        type: Types.ObjectId,
        ref: 'Bot'
        }]

    }
)

module.exports = mongoose.model('User', userSchema);