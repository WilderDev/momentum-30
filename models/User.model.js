// * IMPORTS
const { model, Schema } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// * SCHEMA
const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    minlength: 3,
    maxlength: 50,
  },
  pic: {
    type: String
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
  experienceLevel: {
    type: Number,
    min: 1,
    max: 30,
    required: true,
    default: 1
  },
  streak: {
    type: Number,
    default: 0
  },
  role: {
    type: String,
    enum: ['free', 'user', 'admin'],
    default: 'user',
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
});
// Presave Password Hashing
UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
// Generate JWT With Schema Methods
UserSchema.methods.createToken = function () {
  return jwt.sign(
    { userId: this._id, name: this.name, role: this.role },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d',
    },
  );
};
// Compare incoming password to hashed password for validity
UserSchema.methods.comparePassword = async function (incomingPassword) {
  const isMatch = await bcrypt.compare(incomingPassword, this.password);
  return isMatch;
};
// * EXPORTS
module.exports = model('User', UserSchema);